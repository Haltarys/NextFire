import { auth, firestore } from '@/lib/firebase';
import {
  doc,
  DocumentReference,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

interface HeartButtonProps {
  postRef: DocumentReference;
}

export default function HeartButton({ postRef }: HeartButtonProps) {
  const heartRef = doc(
    firestore,
    postRef.path,
    'hearts',
    auth.currentUser!.uid,
  );
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const uid = auth.currentUser!.uid;

    const batch = writeBatch(firestore);
    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    const batch = writeBatch(firestore);

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists() ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>❤️ Heart</button>
  );
}
