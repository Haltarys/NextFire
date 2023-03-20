import { Metatags } from '@/components';
import PostFeed from '@/components/PostFeed';
import UserProfile from '@/components/UserProfile';
import { db } from '@/lib/firebase/firebase';
import {
  docToJSONSerialisable,
  getUserWithUsername,
} from '@/lib/firebase/helpers';
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

type UserPageProps = {
  user: User;
  posts: Post[];
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async ({
  query: { username },
}) => {
  const userDoc = await getUserWithUsername(username as string);

  if (userDoc) {
    const user = userDoc.data() as User;

    const postsQuery = query(
      collection(db, 'users', userDoc.id, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5),
    );

    const posts = (await getDocs(postsQuery)).docs.map(
      docToJSONSerialisable<Post>,
    );
    return { props: { user, posts } };
  } else {
    return { notFound: true };
  }
};

export default function UserPage({ user, posts }: UserPageProps) {
  return (
    <main>
      <Metatags
        title={`${user.username}'s profile - NextFire`}
        description={`${user.username}'s profile.`}
      />
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} />
    </main>
  );
}
