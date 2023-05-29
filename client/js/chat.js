// 입퇴장 메시지 그리기
const drawJoinLeave = (data, type) => {
  const { username, data: message } = data;
  const chat = document.createElement('div');
  chat.classList.add('chat');
  const chatJoinLeave = document.createElement('div');
  chatJoinLeave.classList.add(type == 'join' ? 'chat-join' : 'chat-leave');
  chatJoinLeave.innerText = `${username} ${message}`;
  chat.appendChild(chatJoinLeave);
  const chatContainer = document.getElementById('chat-container');
  chatContainer.appendChild(chat);
};

// 일반적인 채팅창 그리기
const drawChat = (data) => {
  const { username, data: message, time } = data;
  const chat = document.createElement('div');
  chat.classList.add('chat');
  const chatUsername = document.createElement('div');
  chatUsername.classList.add('chat-username');
  chatUsername.innerText = username;
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');
  chatMessage.innerText = message;
  const chatTime = document.createElement('div');
  chatTime.classList.add('chat-time');
  let chatTimeFormat = new Date(time);
  chatTimeFormat = `${
    chatTimeFormat.getHours() < 12 ? '오전' : '오후'
  } ${String(chatTimeFormat.getHours()).padStart(2, '0')}:${String(
    chatTimeFormat.getMinutes(),
  ).padStart(2, '0')}`;
  chatTime.innerText = chatTimeFormat;
  chat.appendChild(chatUsername);
  chat.appendChild(chatMessage);
  chat.appendChild(chatTime);
  const chatContainer = document.getElementById('chat-container');
  chatContainer.appendChild(chat);
};

// 이미지 그리기
const drawImage = (data) => {
  const { username, data: image, time } = data;
  const chat = document.createElement('div');
  chat.classList.add('chat');
  const chatUsername = document.createElement('div');
  chatUsername.classList.add('chat-username');
  chatUsername.innerText = username;
  const chatImage = document.createElement('img');
  chatImage.classList.add('chat-image');
  chatImage.src = image;
  const chatTime = document.createElement('div');
  chatTime.classList.add('chat-time');
  let chatTimeFormat = new Date(time);
  chatTimeFormat = `${
    chatTimeFormat.getHours() < 12 ? '오전' : '오후'
  } ${String(chatTimeFormat.getHours()).padStart(2, '0')}:${String(
    chatTimeFormat.getMinutes(),
  ).padStart(2, '0')}`;
  chatTime.innerText = chatTimeFormat;
  chat.appendChild(chatUsername);
  chat.appendChild(chatImage);
  chat.appendChild(chatTime);
  const chatContainer = document.getElementById('chat-container');
  chatContainer.appendChild(chat);
};
