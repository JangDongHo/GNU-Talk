const socket = new WebSocket('ws://localhost:8080');
const roomId = 'waiting';

socket.onopen = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  let data;
  if (!userData) {
    const userId = uuidv4();
    const userName = '낯선남자' + userId.split('-')[1];
    data = { userId: userId, userName: userName, roomId: roomId };
    sessionStorage.setItem('userData', JSON.stringify(data));
  } else {
    const { userId, userName } = userData;
    data = { userId: userId, userName: userName, roomId: roomId };
  }
  socketEmit('setInit', data);
  const { userId, userName } = JSON.parse(sessionStorage.getItem('userData'));
  socketEmit('getChatRoomList');

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.event) {
      case 'getChatRoomList':
        const { rooms } = message;
        rooms.forEach((room) => {
          drawRoom(room);
        });
        break;
      case 'createRoom':
        drawRoom(message);
        if (message.userId === userId)
          window.location.href = `/room/${message.roomId}`;
        break;
      case 'deleteRoom':
        const { roomId } = message;
        deleteRoom(roomId);
        break;
      case 'joinRoom':
        break;
      case 'leaveRoom':
        break;
    }
  };
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

function deleteRoom(roomId) {
  const room = document.getElementById(roomId);
  room.remove();
}

function setNickname() {
  const changedNickname = document.getElementById('nickname-input').value;
  if (changedNickname === '') {
    alert('닉네임을 입력해주세요.');
    return;
  }

  // 유저 정보 불러오기
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const { userId, userName, roomId } = userData;
  const data = {
    userId,
    userName: changedNickname,
    roomId,
  };
  sessionStorage.setItem('userData', JSON.stringify(data));
}

// uuid 생성 함수
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
}
