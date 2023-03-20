import { auth, db } from '@/lib/firebase/firebase';
import { docToJSONSerialisable } from '@/lib/firebase/helpers';
import { Post } from '@/lib/types';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import PostFeed from '../PostFeed';

export default function PostList() {
  const postsQuery = query(
    collection(db, 'users', auth.currentUser!.uid, 'posts'),
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
