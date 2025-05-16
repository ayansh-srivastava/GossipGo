const socket = io();

socket.on('new_msg', (data) => {
    const chatContainer = document.getElementById("chat-container");
    
    const messageBlock = document.createElement("div");
    messageBlock.classList.add("message-block");

    const timeString = new Date().toLocaleTimeString();

    messageBlock.innerHTML = `
        <span class="message-user">${data.user}</span>
        <span class="message-time">${timeString}</span>
        <p class="message-content">${data.content}</p>
    `;
    
    chatContainer.appendChild(messageBlock);
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

document.getElementById("chat-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const messageInput = document.getElementById("message-input");
    
    const message = {
        user: "User123",  //TODO
        content: messageInput.value
    };

   const chatContainer = document.getElementById("chat-container");


    const messageBlock = document.createElement("div");
    messageBlock.classList.add("message-block");

    const timeString = new Date().toLocaleTimeString();

    messageBlock.innerHTML = `
        <span class="message-user">Me</span>
        <span class="message-time">${timeString}</span>
        <p class="message-content">${message.content}</p>
    `;

    chatContainer.appendChild(messageBlock);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    messageInput.value = "";
    socket.emit('send_message', message);
  
});
