const socket = new WebSocket('ws://localhost:8080');
const roomId = 'waiting';

socket.onopen = () => {
  sendRoomId('joinWaitingRoom');
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.event) {
      case 'joinWaitingRoom':
        const { rooms } = message;
        rooms.forEach((room) => {
          drawRoom(room);
        });
        break;
      case 'createRoom':
        drawRoom(message);
        break;
      case 'deleteRoom':
        break;
      case 'joinRoom':
        break;
      case 'leaveRoom':
        break;
    }
  };
};

function sendRoomId(type) {
  socket.send(
    JSON.stringify({
      event: type,
      data: roomId,
    }),
  );
}

function createRoom() {
  const roomTitle = document.getElementById('create-room-input').value;
  const roomInfo = { roomTitle: roomTitle };
  socket.send(
    JSON.stringify({
      event: 'createRoom',
      data: roomInfo,
    }),
  );
}
