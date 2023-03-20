import { Loader, Metatags } from '@/components';
import PostFeed from '@/components/PostFeed';
import { db } from '@/lib/firebase/firebase';
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

const LOAD_LIMIT = 10;

type HomeProps = {
  initialPosts: Post[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const postsQuery = query(
    collectionGroup(db, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LOAD_LIMIT),
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
      collectionGroup(db, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LOAD_LIMIT),
    );
    const nextPosts = (await getDocs(nextPostsQuery)).docs.map(
      docToJSONSerialisable<Post>,
    );

    setPosts(posts.concat(nextPosts));
    setLoading(false);

    if (nextPosts.length < LOAD_LIMIT) setHasReachedEnd(true);
  };

  return (
    <main>
      <Metatags
        title="Latest posts - NextFire"
        description="See the latest posts on NextFire, a Dev.to clone build with Next 12 and Firebase."
      />
      <div className="card card-info">
        <h2>NextFire</h2>
        <p>
          A{' '}
          <a href="https://dev.to" target="_blank" rel="noreferrer noopener">
            Dev.to
          </a>{' '}
          clone built with{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js 12
          </a>{' '}
          and{' '}
          <a
            href="https://firebase.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firebase
          </a>
          .
        </p>
        <p>
          You can view the source code on GitHub{' '}
          <a
            href="https://github.com/Haltarys/NextFire"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          !
        </p>
      </div>

      <PostFeed posts={posts} admin={false} />
      {!loading && !hasReachedEnd && (
        <button onClick={loadMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {hasReachedEnd && 'You have reached the end!'}
    </main>
  );
}
