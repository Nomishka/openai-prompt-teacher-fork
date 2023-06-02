// Request for notification permission
Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});

// Function to display a notification
function displayNotification() {
  if (Notification.permission === 'granted') {
    var notif = new Notification('Hello world!', {
      body: 'This is a notification',
      tag: 'sample-notification',
      renotify: true
    });
    notif.onclick = function(event) {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      window.open('https://www.example.com', '_blank');
    }
  }
}

// Event listener for "Show Notification" button
document.getElementById('show').addEventListener('click', () => {
  displayNotification();
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/openai-prompt-teacher/sw.js');
  });
}

// Event listener for settings form submission
document.querySelector("#settings form").addEventListener("submit", function(event) {
  event.preventDefault();
  const apiKey = document.querySelector("#api-key").value;
  const notifTime = document.querySelector("#notif-time").value;
  localStorage.setItem('apiKey', apiKey);
  localStorage.setItem('notifTime', notifTime);
});
