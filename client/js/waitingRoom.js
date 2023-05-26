const drawRoom = (data) => {
  console.log(data);
  const roomList = document.getElementById('room-list');
  const room = document.createElement('li');
  room.id = data.roomId;
  room.className = 'room';
  room.innerHTML = `<div class="room-title">${data.roomTitle}</div>
    <button class="join-room-button" onclick="location.href='/room/${data.roomId}'">Join</button>
                    </div>`;
  roomList.appendChild(room);
};
