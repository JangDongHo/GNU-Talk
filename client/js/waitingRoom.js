const drawRoom = (data) => {
  const roomList = document.getElementById('room-list');
  const room = document.createElement('li');
  const colorBox = document.createElement('div');
  colorBox.className = 'color-box';
  room.id = data.roomId;
  room.className = 'room';
  let chatTimeFormat = new Date(data.time);
  chatTimeFormat = `${
    chatTimeFormat.getHours() < 12 ? '오전' : '오후'
  } ${String(chatTimeFormat.getHours()).padStart(2, '0')}:${String(
    chatTimeFormat.getMinutes(),
  ).padStart(2, '0')}`;
  room.innerHTML = `<div class="room-title">${data.roomTitle}</div>
  <div class = "room-time">${chatTimeFormat}</div>`;
  roomList.appendChild(room);
  room.insertBefore(colorBox, room.firstChild);
  room.addEventListener('click', () => {
    location.href = `/room/${data.roomId}`;
  });
  // 랜덤한 색상을 생성하여 배경색으로 지정
  const randomColor = getRandomColor();
  colorBox.style.backgroundColor = randomColor;
};

// 랜덤한 색상을 반환하는 함수
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const handleCreateRoom = () => {
  const roomCreateContainer = document.getElementById('room-create-container');
  roomCreateContainer.classList.toggle('except-content');
};

const handleSetNickname = () => {
  const setNicknameContainer = document.getElementById(
    'set-nickname-container',
  );
  setNicknameContainer.classList.toggle('except-content');
};
