import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  clients: WebSocket[] = [];

  handleConnection(client: WebSocket) {
    this.clients.push(client);
    console.log('Client connected');
  }

  handleDisconnect(client: WebSocket) {
    this.clients = this.clients.filter((c) => c !== client);
    console.log('Client disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: string) {
    console.log('Received message:', payload);

    const message = JSON.stringify({ event: 'message', data: payload });

    this.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  }
}
