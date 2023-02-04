import { auth, firestore } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type UserData = {
  user: User | undefined;
  username: string | undefined;
};

export const UserDataContext = createContext<UserData>({
  user: undefined,
  username: undefined,
});

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string | undefined>();

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, 'users', user.uid);
      unsubscribe = onSnapshot(ref, (doc) => setUsername(doc.data()?.username));
    } else {
      setUsername(undefined);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
