const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  appendMessage('user', userMessage);
  input.value = '';

  try {
    const response = await fetch('https://testechat-backend-vlsq.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    appendMessage('bot', data.reply);
  } catch (error) {
    appendMessage('bot', 'Erro ao responder. Tente novamente mais tarde.');
  }
});

function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.className = sender;
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
