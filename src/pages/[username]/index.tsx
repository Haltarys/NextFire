import PostFeed from '@/components/PostFeed/PostFeed';
import UserProfile from '@/components/UserProfile/UserProfile';
import { firestore } from '@/lib/firebase';
import { docToJSONSerialisable, getUserWithUsername } from '@/lib/helpers';
import { Post, User } from '@/lib/types';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({
  query: { username },
}) => {
  const userDoc = await getUserWithUsername(username as string);

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();

    const postsQuery = query(
      collection(firestore, 'users', userDoc.id, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5),
    );

    posts = (await getDocs(postsQuery)).docs.map(docToJSONSerialisable);
  }

  return { props: { user, posts } };
};
interface UserPageProps {
  user: User;
  posts: Post[];
}

export default function UserPage({ user, posts }: UserPageProps) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} />
    </main>
  );
}
