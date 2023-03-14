import { PostManager } from '@/components/admin';
import AuthCheck from '@/components/AuthCheck';

export default function AdminPostEditPage() {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}
