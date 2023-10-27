import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
export class SocketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('socketID: ', socket.id);
      console.log('Connected');
      this.server.emit('another_login', `${socket.id} login success`);
    });
  }
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): void {
  //   this.server.emit('message', payload);
  //   // return 'Hello world!';
  // }
  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: any): void {
    this.server.emit('message', payload);
  }
  // @SubscribeMessage('another_login')
  // listenLogin(@MessageBody() body: any): void {
  //   // this.server.emit('message', payload);
  //   console.log(body);
  //   // return 'Hello world!';
  // }
}
