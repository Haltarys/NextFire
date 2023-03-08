import { Post } from '@/lib/types';
import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const createdAt = new Date(post.createdAt);

  return (
    <div className="card">
      <h1>{post.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post.username}`}>
          <a className="text-info">@{post.username}</a>
        </Link>
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
}
