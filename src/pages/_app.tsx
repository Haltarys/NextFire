import { Navbar } from '@/components';
import { UserDataContext, useUserData } from '@/components/UserData';
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
        <meta name="description" content="A Dev.to clone." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserDataContext.Provider value={{ user, username }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserDataContext.Provider>
    </>
  );
}
