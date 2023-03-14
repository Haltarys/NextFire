import { Metatags } from '@/components';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main>
      <Metatags
        title="Page not found - NextFire"
        description="Page not found. Check the URL and try again."
      />
      <h1>404 - This page does not exist.</h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <button className="btn-blue">Go home</button>
      </Link>
    </main>
  );
}
