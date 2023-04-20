import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { storage, firestore } from 'firebase-admin';

if (process.env.NODE_ENV !== 'production') {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';
}

initializeApp();

// When deleting a document, Firestore does not delete all of its subcollections,
// so we need to do it manually.
export const deleteHeartsTiedToPost = functions.firestore
  .document('users/{userId}/posts/{postId}')
  .onDelete(async (snapshot, context) => {
    const { postId } = context.params;
    const batch = firestore().batch();

    return snapshot.ref
      .collection('hearts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
      })
      .then(() => {
        batch.commit();
      })
      .then(() => {
        functions.logger.info(`Deleted hearts for post ${postId}.`);
      })
      .catch((err) => {
        functions.logger.error(
          `Error deleting hearts for post ${postId}: ${err}`,
        );
      });
  });

export const deleteImagesTiedToPost = functions.firestore
  .document('users/{userId}/posts/{postId}')
  .onDelete(async (snapshot, context) => {
    const { userId, postId } = context.params;

    return storage()
      .bucket()
      .deleteFiles({ prefix: `uploads/${userId}/posts/${postId}` })
      .then(() => {
        functions.logger.info(`Deleted images for post ${postId}.`);
      })
      .catch((err) => {
        functions.logger.error(
          `Error deleting images for post ${postId}: ${err}`,
        );
      });
  });
