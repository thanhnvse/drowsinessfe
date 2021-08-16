import * as firebase from 'firebase/app';
// import constant from './constant';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBBMSCn0GUkuDCYZP-7-KkOTrZRE1gDIew',
  authDomain: 'nhatro-sac.firebaseapp.com',
  databaseURL: 'https://nhatro-sac.firebaseio.com',
  projectId: 'nhatro-sac',
  storageBucket: 'nhatro-sac.appspot.com',
  messagingSenderId: '879858757535',
  appId: '1:879858757535:web:f5f71b5d1ff47e1e6617aa',
  measurementId: 'G-P5LQV1RXZD',
};
firebase.initializeApp(firebaseConfig);
// initialize cloud firestore through firebase

// const db = firebase.firestore();
// window.db = db;
// // disable deprecated features
// db.settings({
//   timestampsInSnapshots: true,
// });
const store = firebase.firestore();
store.enablePersistence({ synchronizeTabs: true });

let messaging = null;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
  // messaging.usePublicVapidKey(constant.PUBLIC_VAPID_KEY);
  // messaging.getToken({ vapidKey: constant.PUBLIC_VAPID_KEY });
}

const auth = firebase.auth();
auth.onAuthStateChanged(
  (user) => {
    if (user) {
      window.$cookies.set('firebaseLoggedIn', true);
    } else {
      window.$cookies.set('firebaseLoggedIn', false);
    }
  },
  (error) => {
    console.log(error);
  },
);
export default {
  store,
  messaging,
  auth,
  authNamespace: firebase.auth,
};
