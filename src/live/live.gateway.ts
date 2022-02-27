import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { LiveService } from './live.service';
import { CreateLiveDto } from './dto/create-live.dto';
import { UpdateLiveDto } from './dto/update-live.dto';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class LiveGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private users = {};
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  constructor(private readonly liveService: LiveService) {}

  @SubscribeMessage('createLive')
  create(@MessageBody() createLiveDto: CreateLiveDto) {
    return this.liveService.create(createLiveDto);
  }

  @SubscribeMessage('dispatch')
  findAll(socket, data) {
    console.log('called?', data);
    this.server.emit('dispatch', { data: 'hello' });
    return 'test';
  }

  @SubscribeMessage('findOneLive')
  findOne(@MessageBody() id: number) {
    return this.liveService.findOne(id);
  }

  @SubscribeMessage('updateLive')
  update(@MessageBody() updateLiveDto: UpdateLiveDto) {
    return this.liveService.update(updateLiveDto.id, updateLiveDto);
  }

  @SubscribeMessage('removeLive')
  remove(@MessageBody() id: number) {
    return this.liveService.remove(id);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    //@TODO: upgrade the client type
    this.logger.log(`Client disconnected: ${client.id}`);
    client.broadcast.emit('dispatch:user:disconnected', {
      id: client['user'].id,
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    client['user'] = client.handshake['auth'];
    console.log('client', client['user']);
    client.broadcast.emit('dispatch:user:connected', {
      id: client['user'].id,
      username: client['user'].name,
    });
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('hello:hello');
  }
}
