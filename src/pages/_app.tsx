import { Navbar } from '@/components';
import { UserDataContext, useUserData } from '@/lib/hooks/userData';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  const { user, username } = useUserData();

  return (
    <>
      <Head>
        <title>NextFire</title>
        <meta
          name="description"
          content="A a Dev.to clone build with Next 12 and Firebase."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <UserDataContext.Provider value={{ user: user ?? null, username }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserDataContext.Provider>
    </>
  );
}
