import { UserDataContext } from '@/components/UserData';
import { auth, googleAuthProvider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';

function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then(console.log)
      .catch(console.error);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src="/google-logo.png" alt="Google Logo" />
      Sign in with Google
    </button>
  );
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
}

function UsernameForm() {
  return null;
}

export default function LoginPage() {
  const { user, username } = useContext(UserDataContext);

  return (
    <main>
      {user ? (
        !username ? (
          <SignOutButton />
        ) : (
          <UsernameForm />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
