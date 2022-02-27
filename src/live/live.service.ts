import { Injectable } from '@nestjs/common';
import { CreateLiveDto } from './dto/create-live.dto';
import { UpdateLiveDto } from './dto/update-live.dto';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
@Injectable()
@WebSocketGateway({ cors: true })
export class LiveService {
  @WebSocketServer() server: Server;
  create(createLiveDto: CreateLiveDto) {
    return 'This action adds a new live';
  }

  findAll() {
    return `This action returns all live`;
  }

  findOne(id: number) {
    return `This action returns a #${id} live`;
  }

  update(id: number, updateLiveDto: UpdateLiveDto) {
    return `This action updates a #${id} live`;
  }

  remove(id: number) {
    return `This action removes a #${id} live`;
  }

  broadcastEntityChange(
    entityName: string,
    action: 'create' | 'update' | 'delete',
    payload: any
  ) {
    this.server.emit(`${entityName}:${action}`, payload);
  }
}
