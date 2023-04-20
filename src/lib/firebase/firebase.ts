import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

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
export const functions = getFunctions();

// If in development mode, use emulators
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  // Needed, otherwise you get an error by connecting to the emulator after settings have been set
  // @ts-expect-error
  !db._settingsFrozen && connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export default app;
