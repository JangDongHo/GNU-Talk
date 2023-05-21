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

  clients: { [id: string]: WebSocket } = {};

  handleConnection(client: WebSocket): void {
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
    delete this.clients[client['id']];
    console.log('Client disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: string) {
    console.log('Received message:', payload);

    const message = JSON.stringify({
      event: 'message',
      username: client['username'],
      data: payload,
    });

    Object.values(this.clients).forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  }
}
