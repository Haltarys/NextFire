import { CreatePost, PostList } from '@/components/admin';
import AuthCheck from '@/components/AuthCheck';

export default function AdminPage() {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreatePost />
      </AuthCheck>
    </main>
  );
}
