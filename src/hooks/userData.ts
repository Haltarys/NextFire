import { auth, firestore } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type UserData = {
  user: User | null;
  username: string | null;
};

export const UserDataContext = createContext<UserData>({
  user: null,
  username: null,
});

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, 'users', user.uid);
      unsubscribe = onSnapshot(ref, (doc) => setUsername(doc.data()?.username));
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
