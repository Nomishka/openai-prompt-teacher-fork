// Get HTML elements
const chatContainer = document.getElementById("chat-container");
const messageInput = document.getElementById("message");
const sendMessageButton = document.getElementById("send-message");
const settingsButton = document.getElementById("settings-button");
const settingsMenu = document.getElementById("settings-menu");
const saveSettingsButton = document.getElementById("save-settings");
const notificationTimeInput = document.getElementById("notification-time");
const apikeyInput = document.getElementById("api-key");
const saveApikeyButton = document.getElementById("save-api-key");
const settingsApikeyInput = document.getElementById("settings-api-key");

// Initialize OpenAI API
let openai = null;

// Initialize chat history
let chatHistory = "";

// Initialize notification time
let notificationTime = "09:00";

// Initialize API key
let apiKey = null;

// Initialize settings API key
let settingsApiKey = null;

// Function to add a chat message to the chat container
function addChatMessage(message) {
  // Add the message to the chat history
  chatHistory += message;

  // Update the chat container with the new message
  chatContainer.innerHTML = chatHistory;

  // Scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to send a message to the OpenAI API
async function sendMessage(message) {
  // Send the message to the OpenAI API
  const response = await openai.complete({
    engine: "text-davinci-002",
    prompt: message,
    maxTokens: 150,
    n: 1,
    temperature: 0.5,
  });

  // Get the first choice from the response
  const choice = response.data.choices[0];

  // Get the text of the choice
  const text = choice.text.trim();

  // Add the chat message to the chat container
  addChatMessage(`<p><strong>You:</strong> ${message}</p>`);
  addChatMessage(`<p><strong>ChatGPT:</strong> ${text}</p>`);
}

// Function to handle sending a message
async function handleSendMessage() {
  // Get the message from the input
  const message = messageInput.value;

  // Send the message if it is not empty
  if (message) {
    await sendMessage(message);

    // Clear the message input
    messageInput.value = "";
  }
}

// Function to handle showing the settings menu
function handleShowSettingsMenu() {
  settingsMenu.classList.remove("hidden");
}

// Function to handle hiding the settings menu
function handleHideSettingsMenu() {
  settingsMenu.classList.add("hidden");
}

// Function to handle saving the settings
function handleSaveSettings() {
  // Update the notification time
  notificationTime = notificationTimeInput.value;

  // Update the API key
  apiKey = apikeyInput.value;

  // Update the settings API key
  settingsApiKey = settingsApikeyInput.value;

  // Hide the settings menu
  handleHideSettingsMenu();
}

// Function to check if it is time to show the daily exercise prompt
function checkNotificationTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  if (time === notificationTime) {
    // Show the daily exercise prompt
    sendMessage("Provide me a prompt to rate from 1 to 10");
  }
}

// Function to initialize the app
async function initialize() {
  // Create the OpenAI API client
 
