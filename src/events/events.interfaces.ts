export interface Room {
  [id: string]: WebSocket[];
}

export interface Client {
  [id: string]: WebSocket;
}
