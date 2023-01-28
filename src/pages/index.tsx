import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>NextFire</title>
        <meta name="description" content="A Dev.to clone." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>NextFire</h1>
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
    </>
  );
}
