import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  client: Record<string, any>;
  constructor() {
    this.client = {};
  }
  @WebSocketServer()
  server: Server;

  public handleConnection(client): void {
    console.log('hi');
    client['id'] = String(Number(new Date()));
    client['nickname'] = '낯선남자' + String(Number(new Date()));
    this.client[client['id']] = client;
  }

  public handleDisconnect(client): void {
    console.log('bye', client['id']);
    delete this.client[client['id']];
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    for (const [key, value] of Object.entries(this.client)) {
      value.send(
        JSON.stringify({
          event: 'events',
          data: { nickname: client['nickname'], message: payload },
        }),
      );
    }
  }
}
