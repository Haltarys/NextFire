import { UserDataContext } from '@/hooks/userData';
import { firestore } from '@/lib/firebase';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import type { ChangeEvent } from 'react';
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import UsernameMessage from './UsernameMessage';

export default function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, username } = useContext(UserDataContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // restrict username to alphanumeric characters
    const val = e.target.value.toLowerCase();
    // Asserts that the value is a string with a length between 3 and 15 characters
    // with no leading, trailing, or consecutive underscores or dots
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setIsLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setIsLoading(true);
      setIsValid(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = doc(firestore, 'usernames', username);
        const usernameDoc = await getDoc(ref);
        console.log('Firestore read executed');

        setIsLoading(false);
        setIsValid(!usernameDoc.exists());
      }
    }, 500),
    [],
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userRef = doc(firestore, 'users', user!.uid);
    const usernameRef = doc(firestore, 'usernames', formValue);

    const batch = writeBatch(firestore);
    batch.set(userRef, {
      username: formValue,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
    });
    batch.set(usernameRef, { uid: user?.uid });
    await batch.commit();
  };

  return username ? null : (
    <section>
      <h3>Choose a username</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="username"
          autoComplete="username"
          value={formValue}
          onChange={handleChange}
        />
        <UsernameMessage
          username={formValue}
          isLoading={isLoading}
          isValid={isValid}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>debug info</h3>
        Username: {formValue}
        <br />
        Loading: {isLoading.toString()}
        <br />
        Username Valid: {isValid.toString()}
      </div>
    </section>
  );
}
