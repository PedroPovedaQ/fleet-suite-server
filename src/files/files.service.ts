import { Injectable } from '@nestjs/common';
import { S3, config } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {}
  async attach(fileBuffer, filename, type, id, category, expiration) {
    if (Number(category) > 0) {
      return this.uploadFile(
        fileBuffer,
        filename,
        type,
        id,
        category,
        expiration
      );
    }
    // If category is a string and not a number
    const categoryQuery = await this.prismaService.category.findFirst({
      where: { type, name: category },
    });
    return this.uploadFile(
      fileBuffer,
      filename,
      type,
      id,
      categoryQuery.id,
      expiration
    );
  }

  async getAttachment(id) {
    return this.retrieveFile(id);
  }

  async deleteAttachment(id) {
    return this.deleteFile(id);
  }

  async retrieveFile(id): Promise<any> {
    const credentials = {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    };
    config.update({
      credentials,
      region: this.configService.get('AWS_REGION'),
    });
    const file = await this.prismaService.file.findUnique({
      where: { id: Number(id) },
      include: { file_category: true },
    });

    const s3 = new S3();
    const exists = await s3
      .headObject({
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();

    if (exists) {
      const url = s3.getSignedUrlPromise('getObject', {
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Key: file.key,
        ResponseContentDisposition: 'attachment; filename ="' + file.name + '"',
        Expires: 60,
      });
      return { file, url: await url };
    }
    throw Error('File does not exist');
  }

  async deleteFile(id): Promise<any> {
    const file = await this.prismaService.file.findUnique({
      where: { id: Number(id) },
    });

    const s3 = new S3();

    return Promise.all([
      s3
        .deleteObject({
          Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
          Key: file.key,
        })
        .promise(),
      this.prismaService.file.delete({ where: { id: Number(id) } }),
    ]);
  }

  async uploadFile(
    dataBuffer: Buffer,
    filename: string,
    relationField: string,
    id: number,
    categoryId: number,
    expiration
  ) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    return this.prismaService.file.create({
      data: {
        key: uploadResult.Key,
        url: uploadResult.Location,
        name: filename,
        file_category: { connect: { id: Number(categoryId) } },
        [relationField]: { connect: { id: Number(id) } },
        expiration: expiration ? new Date(expiration) : undefined,
      },
    });
  }
}
