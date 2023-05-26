const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.event) {
      case 'createRoom':
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
