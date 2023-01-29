import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function Home() {
  return (
    <main>
      <h1>NextFire</h1>
      <button onClick={() => toast.success('hello there')}>Toast!!!</button>
      <ul>
        <li>
          <Link href="/login">Log in</Link>
        </li>
        <li>
          <Link href="/batman">Go to batman user</Link>
        </li>
        <li>
          <Link href="/batman/some-post">Go to batman post</Link>
        </li>
        <li>
          <Link href="/admin">Go to admin</Link>
        </li>
        <li>
          <Link href="/admin/some-post">Go to admin post edit</Link>
        </li>
      </ul>
    </main>
  );
}
