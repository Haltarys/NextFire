import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, username } = { user: null, username: null };
  console.log(styles);

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <button className="btn-blue">FEED</button>
          </Link>
        </li>
        {username ? (
          <>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                {/** @ts-ignore */}
                <Image src={user?.photoURL} alt="Profile picture" />
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
