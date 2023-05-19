const drawChat = (data) => {
  console.log(data);
  const username = data.username;
  const message = data.data;
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
