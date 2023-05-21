// 일반적인 채팅창 그리기
const drawChat = (data) => {
  const { username, data: message } = data;
  const chat = document.createElement('div');
  chat.classList.add('chat');
  const chatUsername = document.createElement('div');
  chatUsername.classList.add('chat-username');
  chatUsername.innerText = username;
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');
  chatMessage.innerText = message;
  chat.appendChild(chatUsername);
  chat.appendChild(chatMessage);
  const chatContainer = document.getElementById('chat-container');
  chatContainer.appendChild(chat);
};

// 입장 메시지 그리기
const drawJoin = (data) => {
  const { username, data: joinMessage } = data;
  const chat = document.createElement('div');
  chat.classList.add('chat');
  const chatJoin = document.createElement('div');
  chatJoin.classList.add('chat-join');
  chatJoin.innerText = `${username} ${joinMessage}`;
  chat.appendChild(chatJoin);
  const chatContainer = document.getElementById('chat-container');
  chatContainer.appendChild(chat);
};
