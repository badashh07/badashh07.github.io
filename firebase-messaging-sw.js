importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");
firebase.initializeApp({
   apiKey: "AIzaSyDGsoBTz61BrcSFxI5VF7vxGodtelRCVQ0",
   authDomain: "chatapplicationdemo-a2cdf.firebaseapp.com",
   databaseURL: "https://chatapplicationdemo-a2cdf-default-rtdb.firebaseio.com",
   projectId: "chatapplicationdemo-a2cdf",
   storageBucket: "chatapplicationdemo-a2cdf.appspot.com",
   messagingSenderId: "635023006984",
   appId: "1:635023006984:web:bdee2fec7fa755971ca0bd",
   measurementId: "G-9J69J6W0Y2"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});