import { UserDataContext } from '@/hooks/userData';
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
          <Link href="/">
            <button className="btn-logo">NextFire</button>
          </Link>
        </li>

        {user && username ? (
          <>
            <li className="push-left">
              <button className="btn-blue" onClick={signOut}>
                Sign out
              </button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write posts</button>
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
            <Link href="/signin">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
