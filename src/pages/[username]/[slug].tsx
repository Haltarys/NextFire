import { Metatags, PostContent } from '@/components';
import AuthCheck from '@/components/AuthCheck';
import HeartButton from '@/components/HeartButton';
import { UserDataContext } from '@/lib/hooks/userData';
import { db } from '@/lib/firebase/firebase';
import {
  docToJSONSerialisable,
  getUserWithUsername,
} from '@/lib/firebase/helpers';
import { Post } from '@/lib/types';
import styles from '@/styles/Post.module.css';
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import HeartCount from '@/components/HeartCount';

type UserPostPageProps = {
  post: Post;
  path: string;
};

type UserPostPageParams = {
  username: string;
  slug: string;
};

const REVALIDATE_INTERVAL = 5000; // milliseconds

export const getStaticProps: GetStaticProps<
  UserPostPageProps,
  UserPostPageParams
> = async ({ params }) => {
  const { username, slug } = params!;
  const userDoc = await getUserWithUsername(username);

  const postRef = doc(db, 'users', userDoc.id, 'posts', slug);
  const post = docToJSONSerialisable<Post>(await getDoc(postRef));

  return {
    props: { post, path: postRef.path },
    revalidate: REVALIDATE_INTERVAL,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await getDocs(query(collectionGroup(db, 'posts')));
  const paths = snapshot.docs.map((doc) => {
    const { username, slug } = doc.data();

    return { params: { username, slug } };
  });

  // 'blocking' means that the page will be generated on the fly if it's not already cached
  return { paths, fallback: 'blocking' };
};

export default function UserPostPage({
  path,
  post: initialPost,
}: UserPostPageProps) {
  const postRef = doc(db, path);
  const [realtimePost] = useDocument(postRef);
  const post = realtimePost
    ? docToJSONSerialisable<Post>(realtimePost)
    : initialPost;
  const { user } = useContext(UserDataContext);

  return (
    <main className={styles.container}>
      <Metatags
        title={`${post.title} - NextFire`}
        description={`${post.title} by ${post.username} on NextFire.`}
      />
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>
            <HeartCount count={post.heartCount} />
          </strong>
        </p>

        <AuthCheck
          fallback={<Link href="/signin">❤️ Sign in to heart this post</Link>}
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {user?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`} className="btn w-100">
            Edit
          </Link>
        )}
      </aside>
    </main>
  );
}
