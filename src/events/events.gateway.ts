import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Room, Client } from './events.interfaces';
import { Server, WebSocket } from 'ws';
import { v4 as uuid } from 'uuid';

@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  rooms: Room = {};
  clients: Client = {};

  // 대기실
  @SubscribeMessage('joinWaitingRoom')
  handleWaitingRoomConnect(client: WebSocket, roomId: string): void {
    client['id'] = uuid();
    client['username'] = '낯선남자' + client['id'].split('-')[1];
    this.clients[client['id']] = client;

    if (!this.rooms[roomId]) this.rooms[roomId] = [];

    this.rooms[roomId].push(client);

    // 방 목록 조회
    const rooms = Object.keys(this.rooms).map((key) => {
      // wating 방은 제외
      if (key === 'waiting') return;
      return {
        roomId: key,
        roomTitle: this.rooms[key]['title'],
      };
    });
    console.log(rooms);

    //client.send(this.rooms);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(client: WebSocket, payload: any): void {
    const roomId = uuid();
    const roomTitle = payload.roomTitle || client['username'] + '님의 방';
    const message = JSON.stringify({
      event: 'createRoom',
      roomId: roomId,
      roomTitle: roomTitle,
    });

    // 방 생성
    this.rooms[roomId] = [];
    this.rooms[roomId]['title'] = roomTitle;

    // 대기실 클라이언트들에게 브로드캐스팅
    const roomClients = this.rooms['waiting'];
    roomClients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  }

  // 채팅방
  @SubscribeMessage('joinRoom')
  handleRoomConnect(client: WebSocket, roomId: string): void {
    client['id'] = uuid();
    client['username'] = '낯선남자' + client['id'].split('-')[1];
    this.clients[client['id']] = client;

    if (!this.rooms[roomId]) this.rooms[roomId] = [];

    this.rooms[roomId].push(client);

    const message = JSON.stringify({
      event: 'join',
      username: client['username'],
      data: '님이 입장하셨습니다.',
    });

    // 브로드캐스팅
    const roomClients = this.rooms[roomId];
    roomClients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  }

  handleDisconnect(client: WebSocket): void {
    const roomId =
      Object.keys(this.rooms).find((key) => this.rooms[key].includes(client)) ||
      'waiting';
    const clientId = client['id'];
    const username = client['username'];

    // 클라이언트 정보 삭제
    const roomClients = this.rooms[roomId] || [];
    roomClients.forEach((roomClient) => {
      if (roomClient['id'] === clientId) {
        roomClients.splice(roomClients.indexOf(roomClient), 1);
      }
    });

    // 퇴장 메시지 생성
    const message = JSON.stringify({
      event: 'leave',
      username: username,
      data: '님이 퇴장하셨습니다.',
    });

    // 퇴장한 클라이언트를 제외하고, 해당 방에 속한 클라이언트에게 퇴장 메시지 전송 (브로드캐스팅)
    roomClients.forEach((c) => {
      if (c !== client && c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: string) {
    console.log('Received message:', payload);

    const message = JSON.stringify({
      event: 'message',
      username: client['username'],
      data: payload['message'],
      time: Date.now(),
    });

    const roomClients = this.rooms[payload['roomId']];
    roomClients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  }
}
