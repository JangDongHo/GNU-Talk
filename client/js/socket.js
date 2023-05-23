const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log(`Connected to ${roomId} server`);
  sendRoomId();
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
  console.log('Connection closed');
};

function sendRoomId() {
  const roomId = window.location.pathname.split('/')[2];
  socket.send(
    JSON.stringify({
      event: 'join',
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
      data: message,
    }),
  );
  input.value = '';
}
