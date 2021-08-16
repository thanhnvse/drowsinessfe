import jwt from 'jsonwebtoken';
import firebase from '../config/firebase';

const { auth } = firebase;

function isFirebaseLoggedIn() {
  // return auth.currentUser;
  return window.$cookies.get('firebaseLoggedIn');
}

async function checkIfTokenNeedsRefresh() {
  if (!isFirebaseLoggedIn()) {
    return false;
  }
  const firebaseIdToken = window.$cookies.get('firebaseIdToken');
  if (firebaseIdToken) {
    try {
      const decoded = jwt.decode(firebaseIdToken);
      const { exp } = decoded;
      if (exp && exp < (new Date().getTime() + 1) / 1000) {
        console.log('firebase id token needs to refresh');
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
}

async function updateToken() {
  if (auth.currentUser) {
    console.log('update firebase id token');
    const newFirebaseIdToken = await auth.currentUser.getIdToken(true);
    document.cookie = `firebaseIdToken=${newFirebaseIdToken}`;
    console.log(newFirebaseIdToken);
  }
}

const functions = {
  isFirebaseLoggedIn,
  checkIfTokenNeedsRefresh,
  updateToken,
};

export default functions;
