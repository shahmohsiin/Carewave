import firebase from 'firebase/compat/app'
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  databaseURL: FIREBASE_DATABASE_URL,
};
  
if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

const db = getDatabase();
export {db}
