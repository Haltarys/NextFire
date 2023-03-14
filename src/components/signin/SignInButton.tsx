import { auth, googleAuthProvider } from '@/lib/firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then(() => toast.success('Signed in with Google!'))
      .catch(() => toast.error('Error signing in with Google!'));
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/google-logo.png" alt="Google Logo" />
      Sign in with Google
    </button>
  );
}
