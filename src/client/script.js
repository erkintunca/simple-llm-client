const chatOutput = document.getElementById('chat-output');
const promptInput = document.getElementById('prompt-input');
const sendButton = document.getElementById('send-button');

// Import the Ollama library
import ollama from '../../node_modules/ollama/dist/browser.mjs';
//const ollama = new Ollama.Client();

// Function to send a prompt to the Ollama server and display the response
async function sendPrompt(prompt) {
  try {
    // Display the prompt in the chat output
    chatOutput.innerHTML += `<div><b>You:</b> ${prompt}</div>`;

    // Send the prompt to the Ollama server using the Ollama JS library
    const stream = await ollama.chat({
      model: 'deepseek-r1:7b',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    // Read the response stream
    let responseText = '';
    for await (const chunk of stream) {
      // Decode and display the chunk in the chat output
      responseText += chunk.message.content;
      chatOutput.innerHTML += `<div><b>Ollama:</b> ${responseText}</div>`;
    }
  } catch (error) {
    console.error('Error sending prompt:', error);
    chatOutput.innerHTML += `<div><b>Error:</b> ${error.message}</div>`;
  }
}

// Event listener for the send button
sendButton.addEventListener('click', () => {
  const prompt = promptInput.value;
  promptInput.value = '';
  sendPrompt(prompt);
});