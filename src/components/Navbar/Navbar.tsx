import { UserDataContext } from '@/components/UserData';
import Link from 'next/link';
import { useContext } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, username } = useContext(UserDataContext);

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <button className="btn-blue">FEED</button>
          </Link>
        </li>
        {user && username ? (
          <>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.photoURL || ''}
                  width={50}
                  height={50}
                  alt="Profile picture"
                />
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
