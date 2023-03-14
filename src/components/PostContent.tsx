import { Post } from '@/lib/types';
import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type PostContentProps = {
  post: Post;
};

const formatter = new Intl.RelativeTimeFormat('en');

export default function PostContent({ post }: PostContentProps) {
  const createdAt = new Date(post.createdAt);
  const diff = Date.now() - createdAt.getTime();

  return (
    <div className="card">
      <h1>{post.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post.username}`} className="text-info">
          @{post.username}
        </Link>{' '}
        {formatter.format(-Math.floor(diff / (1000 * 60 * 60 * 24)), 'days')}.
      </span>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
}
