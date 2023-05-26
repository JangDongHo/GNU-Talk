const drawRoom = (data) => {
  const roomList = document.getElementById('room-list');
  const room = document.createElement('li');
  room.id = data.roomId;
  room.className = 'room';
  room.innerHTML = `<div class="room-title">${data.roomTitle}</div>
                    </div>`;
  roomList.appendChild(room);
};
