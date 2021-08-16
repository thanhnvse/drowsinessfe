/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

self.addEventListener('fetch', (event) => {
  event.waitUntil(
    (async function () {
      // Exit early if we don't have access to the client.
      // Eg, if it's cross-origin.
      if (!event.clientId) return;

      // Get the client.
      const client = await clients.get(event.clientId);
      // Exit early if we don't get the client.
      // Eg, if it closed.
      if (!client) return;

      // Send a message to the client.
      client.postMessage({
        msg: 'Hey I just got a fetch from you!',
        url: event.request.url,
      });
    })(),
  );
});

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
  if (!e.data) {
    return;
  }

  switch (e.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});

// workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4, else
// workbox.clientsClaim(); // Vue CLI 3 and Workbox v3.

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp('https://firebasestorage.googleapis.com/v0/b/td-vue-firestore-chat.appspot.com/.*'),
  workbox.strategies.staleWhileRevalidate(),
);

firebase.initializeApp({
  apiKey: 'AIzaSyBBMSCn0GUkuDCYZP-7-KkOTrZRE1gDIew',
  authDomain: 'nhatro-sac.firebaseapp.com',
  databaseURL: 'https://nhatro-sac.firebaseio.com',
  projectId: 'nhatro-sac',
  storageBucket: 'nhatro-sac.appspot.com',
  messagingSenderId: '879858757535',
  appId: '1:879858757535:web:f5f71b5d1ff47e1e6617aa',
  measurementId: 'G-P5LQV1RXZD',
});

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      click_action: 'https://nhatro-sac.web.app/',
    };
    const channel = new BroadcastChannel('yoho-sw-messages');
    channel.postMessage(payload);

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
