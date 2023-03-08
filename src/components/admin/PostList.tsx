import { useUserData } from '@/hooks/userData';
import { firestore } from '@/lib/firebase';
import { docToJSONSerialisable } from '@/lib/helpers';
import { Post } from '@/lib/types';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import PostFeed from '../PostFeed/PostFeed';

export default function PostList() {
  const { user } = useUserData();

  const postsQuery = query(
    collection(firestore, 'users', user!.uid, 'posts'),
    orderBy('createdAt'),
  );
  const [querySnapshot] = useCollection(postsQuery);

  return (
    <>
      <h1>Manage your posts</h1>
      <PostFeed
        posts={querySnapshot?.docs.map(docToJSONSerialisable<Post>)!}
        admin
      />
    </>
  );
}
