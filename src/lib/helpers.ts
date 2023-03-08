import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from './firebase';

export async function getUserWithUsername(username: string) {
  const usersRef = collection(firestore, 'users');
  const userQuery = query(
    usersRef,
    where('username', '==', username),
    limit(1),
  );

  return (await getDocs(userQuery)).docs[0];
}

export function docToJSONSerialisable<T>(document: DocumentSnapshot) {
  const data = document.data();

  if (!data) throw new Error('No document data');

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  } as T;
}
