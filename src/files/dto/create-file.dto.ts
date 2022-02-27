export class CreateFileDto {
  name: string;
  type: string;
  id: number;
  category: string | number;
  expiration?: Date;
}
