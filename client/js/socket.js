const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connected to server');
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log(message);
  };
};

socket.onclose = () => {
  console.log('Connection closed');
};

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
