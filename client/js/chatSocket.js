const socket = new WebSocket('ws://localhost:8080');
const roomId = window.location.pathname.split('/')[2];

socket.onopen = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const { userId, userName } = userData;
  const data = { userId: userId, userName: userName, roomId: roomId };
  socketEmit('joinRoom', data);
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.event) {
      case 'join':
        drawJoinLeave(message, 'join');
        break;
      case 'leave':
        drawJoinLeave(message, 'leave');
        break;
      case 'message':
        drawChat(message);
        break;
      case 'image':
        drawImage(message);
        break;
    }
  };
};

socket.onclose = () => {
  socketEmit('leaveRoom');
};

function socketEmit(type, data) {
  if (!data) data = roomId;
  socket.send(
    JSON.stringify({
      event: type,
      data: data,
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

function sendImage() {
  const input = document.getElementById('image-input');
  const images = Array.from(input.files);
  images.forEach((image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      socket.send(
        JSON.stringify({
          event: 'image',
          data: { roomId, image: reader.result },
        }),
      );
    };
  });
}

function sendCanvas() {
  const canvas = document.getElementById('jsCanvas');
  // 캔버스 초기화
  const image = canvas.toDataURL();
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  socket.send(
    JSON.stringify({
      event: 'image',
      data: { roomId, image },
    }),
  );
}
