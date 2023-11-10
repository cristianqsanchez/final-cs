import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from '@env';

const firebaseConfig = {
  apiKey: 'AIzaSyBUriNiCISL2tjwAB_65yOUpJezDwE1oo4',
  authDomain: 'twitter-f9e75.firebaseapp.com',
  projectId: 'twitter-f9e75',
  storageBucket: 'twitter-f9e75.appspot.com',
  messagingSenderId: '1016657856326',
  appId: '1:1016657856326:web:4b468f0234c17df79c0747',
  measurementId: 'G-TBL4DWFV3B'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;
