import { Loader } from '@/components';
import PostFeed from '@/components/PostFeed/PostFeed';
import { firestore } from '@/lib/firebase/firebase';
import { docToJSONSerialisable } from '@/lib/firebase/helpers';
import { Post } from '@/lib/types';
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

const LIMIT = 1;

interface HomeProps {
  initialPosts: Post[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context,
) => {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
  );

  const posts = (await getDocs(postsQuery)).docs.map(
    docToJSONSerialisable<Post>,
  );

  return { props: { initialPosts: posts } };
};

export default function Home({ initialPosts }: HomeProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(initialPosts.length < 1);

  const loadMorePosts = async () => {
    setLoading(true);

    const lastPost = posts[posts.length - 1];
    const cursor = Timestamp.fromMillis(lastPost.createdAt);

    const nextPostsQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT),
    );
    const nextPosts = (await getDocs(nextPostsQuery)).docs.map(
      docToJSONSerialisable<Post>,
    );

    setPosts(posts.concat(nextPosts));
    setLoading(false);

    if (nextPosts.length < LIMIT) setHasReachedEnd(true);
  };

  return (
    <main>
      <PostFeed posts={posts} admin={false} />
      {!loading && !hasReachedEnd && (
        <button onClick={loadMorePosts}>Load more</button>
      )}
      <Loader show={loading} />

      {hasReachedEnd && 'You have reached the end!'}
    </main>
  );
}
