import { UserDataContext } from '@/lib/hooks/userData';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function Navbar() {
  const { user, username } = useContext(UserDataContext);

  const router = useRouter();
  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" className="btn btn-logo">
            NextFire
          </Link>
        </li>

        {user && username ? (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign out</button>
            </li>
            <li>
              <Link href="/admin" className="btn btn-blue">
                Write posts
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.photoURL || '/hacker.png'}
                  referrerPolicy="no-referrer"
                  width={50}
                  height={50}
                  alt="Profile picture"
                />
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/signin" className="btn btn-blue">
              Sign in
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
