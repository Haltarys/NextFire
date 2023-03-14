import { auth } from '@/lib/firebase/firebase';

export default function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
}
