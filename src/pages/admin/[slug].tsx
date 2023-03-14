import { PostManager } from '@/components/admin';
import AuthCheck from '@/components/AuthCheck';
import Head from 'next/head';

export default function AdminPostEditPage() {
  return (
    <AuthCheck>
      <Head>
        <title>Edit post - NextFire</title>
      </Head>

      <PostManager />
    </AuthCheck>
  );
}
