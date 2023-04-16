import * as functions from 'firebase-functions';
// import { initializeApp } from 'firebase-admin';

// const app = initializeApp();

if (process.env.NODE_ENV !== 'production') {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';
}

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

// export const deleteImagesTiedToPost = functions.firestore
//   .document('users/{userId}/posts/{postId}')
//   .onDelete(async (snap, context) => {
//     const { postId } = context.params;

//     const folderPath = `uploads/${context.auth?.uid}/${postId}`;
//   });
