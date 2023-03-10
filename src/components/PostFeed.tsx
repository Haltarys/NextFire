import { Post } from '@/lib/types';
import Link from 'next/link';
import HeartCount from './HeartCount';

type PostItemProps = {
  post: Post;
  admin: boolean;
};

function PostItem({ post, admin = false }: PostItemProps) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <strong>By @{post.username}</strong>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="push-left">
          <HeartCount count={post.heartCount} />
        </span>
      </footer>

      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}

type PostFeedProps = {
  posts: Post[];
  admin: boolean;
};

export default function PostFeed({ posts, admin }: PostFeedProps) {
  return (
    <>
      {posts?.map((post) => (
        <PostItem post={post} admin={admin} key={post.slug} />
      ))}
    </>
  );
}
