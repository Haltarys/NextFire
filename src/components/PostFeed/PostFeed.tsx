import { Post } from '@/lib/types';
import Link from 'next/link';
import styles from './PostFeed.module.css';

interface PostItemProps {
  post: Post;
  admin: boolean;
}

function PostItem({ post, admin = false }: PostItemProps) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className={styles.card}>
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
          <span className={styles['push-left']}>
            ❤️ {post.heartCount < 2 ? 'heart' : 'hearts'}
          </span>
        </span>
      </footer>
    </div>
  );
}

interface PostFeedProps {
  posts: Post[];
  admin: boolean;
}

export default function PostFeed({ posts, admin }: PostFeedProps) {
  return (
    <>
      {posts?.map((post) => (
        <PostItem post={post} admin={admin} key={post.slug} />
      ))}
    </>
  );
}
