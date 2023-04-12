import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCenB8-gudDDlMG-fJUC81qJWBHjPZx7SU',
  authDomain: 'nextfire-1e8bf.firebaseapp.com',
  projectId: 'nextfire-1e8bf',
  storageBucket: 'nextfire-1e8bf.appspot.com',
  messagingSenderId: '434655679534',
  appId: '1:434655679534:web:65f0725a6f546e5c833bbf',
  measurementId: 'G-L98HH6N864',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();

export default app;
