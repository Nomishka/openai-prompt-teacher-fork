window.onload = () => {
  loadSettings();
  requestNotificationPermissions();
  registerServiceWorker();
};

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  }
}

function loadSettings() {
  document.getElementById('api-key').value = localStorage.getItem('openai_api_key') || '';
  document.getElementById('notification-time').value = localStorage.getItem('notification_time') || '';
}

function saveSettings() {
  localStorage.setItem('openai_api_key', document.getElementById('api-key').value);
  localStorage.setItem('notification_time', document.getElementById('notification-time').value);

  // Set a new notification
  setDailyNotification(document.getElementById('notification-time').value);
}

function requestNotificationPermissions() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === 'granted') {
    console.log('Notification permission granted.');
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }
}

function setDailyNotification(time) {
  const [hour, minute] = time.split(':');
  const notificationDate = new Date();
  notificationDate.setHours(hour);
  notificationDate.setMinutes(minute);

  if (notificationDate < new Date()) {
    notificationDate.setDate(notificationDate.getDate() + 1);
  }

  const delay = notificationDate.getTime() - new Date().getTime();
  setTimeout(() => sendNotification(), delay);
}

function sendNotification() {
  if (Notification.permission === 'granted') {
    new Notification('Time to practice your prompting skills!');
  }
}

function practicePrompting() {
  const prompt = 'Today\'s prompt: Write a story about a cat named Tom.';
  const userResponse = window.prompt(prompt);

  // assuming you have a function that uses the OpenAI API to grade the response
  // const feedback = gradeResponse(getApiKey(), userResponse);
  
  // For the purpose of this example, let's just mimic the feedback.
  const feedback = `Your response was: ${userResponse}. Keep practicing to improve!`;
  
  alert(feedback);
}
