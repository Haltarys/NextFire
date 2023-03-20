import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export async function getUserWithUsername(username: string) {
  const userQuery = query(
    collection(db, 'users'),
    where('username', '==', username),
    limit(1),
  );

  return (await getDocs(userQuery)).docs[0];
}

export function docToJSONSerialisable<T>(snapshot: DocumentSnapshot) {
  const data = snapshot.data({ serverTimestamps: 'estimate' });

  if (!data) throw new Error('No document data');

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  } as T;
}
