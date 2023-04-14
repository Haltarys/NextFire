import { auth, googleAuthProvider } from '@/lib/firebase/firebase';
import { UserDataContext } from '@/lib/hooks/userData';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

export default function SignInButton() {
  const router = useRouter();
  const { username } = useContext(UserDataContext);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        username && router.push('/admin');
        toast.success('Signed in with Google!');
      })
      .catch(() => {
        toast.error('Error signing in with Google!');
      });
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/google-logo.png" alt="Google Logo" />
      Sign in with Google
    </button>
  );
}
