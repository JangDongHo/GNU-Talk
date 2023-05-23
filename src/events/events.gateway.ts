import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { v4 as uuid } from 'uuid';

@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  rooms: { [id: string]: string[] } = {};
  clients: { [id: string]: WebSocket } = {};

  @SubscribeMessage('join')
  handleConnection(client: WebSocket, payload: string): void {
    client['id'] = uuid();
    client['username'] = '낯선남자' + client['id'].split('-')[1];
    this.clients[client['id']] = client;
    const message = JSON.stringify({
      event: 'join',
      username: client['username'],
      data: '님이 입장하셨습니다.',
    });
    Object.values(this.clients).forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  }

  handleDisconnect(client: WebSocket) {
    const message = JSON.stringify({
      event: 'leave',
      username: client['username'],
      data: '님이 퇴장하셨습니다.',
    });
    Object.values(this.clients).forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
    delete this.clients[client['id']];
  }

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: string) {
    console.log('Received message:', payload);

    const message = JSON.stringify({
      event: 'message',
      username: client['username'],
      data: payload,
      time: Date.now(),
    });

    Object.values(this.clients).forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  }
}
