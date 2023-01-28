import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
