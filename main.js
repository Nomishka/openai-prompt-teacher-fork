Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification('Hello world!');
    });
  }
}

document.getElementById('show').addEventListener('click', () => {
  displayNotification();
});

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/openai-prompt-teacher/sw.js');
  });
}

// Handle settings form submission
document.querySelector("#settings form").addEventListener("submit", function(event) {
  event.preventDefault();
  const apiKey = document.querySelector("#api-key").value;
  const notifTime = document.querySelector("#notif-time").value;

  // Here, you can save the apiKey and notifTime to localStorage or to a variable in the script
  console.log("API Key: ", apiKey);
  console.log("Notification Time: ", notifTime);
});
