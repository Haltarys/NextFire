import { auth, googleAuthProvider } from '@/lib/firebase/firebase';
import { signInWithPopup } from 'firebase/auth';

export default function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then(console.log)
      .catch(console.error);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/google-logo.png" alt="Google Logo" />
      Sign in with Google
    </button>
  );
}
