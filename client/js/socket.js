const socket = new WebSocket('ws://localhost:8080');
const roomId = window.location.pathname.split('/')[2];

socket.onopen = () => {
  sendRoomId('joinRoom');
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log(message);
    switch (message.event) {
      case 'message':
        drawChat(message);
        break;
      case 'join':
        drawJoinLeave(message, 'join');
        break;
      case 'leave':
        drawJoinLeave(message, 'leave');
        break;
    }
  };
};

socket.onclose = () => {
  sendRoomId('leaveRoom');
};

function sendRoomId(type) {
  socket.send(
    JSON.stringify({
      event: type,
      data: roomId,
    }),
  );
}

function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value;
  socket.send(
    JSON.stringify({
      event: 'message',
      data: { roomId, message },
    }),
  );
  input.value = '';
}
