import { Metatags } from '@/components';
import { CreatePost, PostList } from '@/components/admin';
import AuthCheck from '@/components/AuthCheck';

export default function AdminPage() {
  return (
    <main>
      <AuthCheck>
        <Metatags
          title="Manage my posts - NextFire"
          description="Manage your posts on NextFire."
        />
        <PostList />
        <CreatePost />
      </AuthCheck>
    </main>
  );
}
