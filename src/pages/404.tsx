import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main>
      <h1>404 - This page does not exist.</h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
      ></iframe>
      <Link href="/">
        <button className="btn-blue">Go home</button>
      </Link>
    </main>
  );
}
