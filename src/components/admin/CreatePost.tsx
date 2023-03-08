import { UserDataContext } from '@/hooks/userData';
import { auth, firestore } from '@/lib/firebase';
import { Post } from '@/lib/types';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import kebabCase from 'lodash.kebabcase';
import { useRouter } from 'next/router';
import { FormEvent, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function CreatePost() {
  const router = useRouter();
  const { username } = useContext(UserDataContext);
  const [title, setTitle] = useState('');
  const slug = encodeURI(
    kebabCase(
      // Remove emoji from the slug
      title.replace(
        /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
        '',
      ),
    ),
  );
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    const ref = doc(firestore, 'users', uid!, 'posts', slug);

    const data: Post = {
      title,
      slug,
      uid,
      username: username!,
      published: false,
      content: '# hello world!',
      // @ts-expect-error
      createdAt: serverTimestamp(),
      // @ts-expect-error
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(ref, data);
    toast.success('Post created!');
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My title"
        className="input"
      />
      <p>
        <strong>Slug:</strong> {slug}
        <button type="submit" disabled={!isValid} className="btn-green">
          Create post
        </button>
      </p>
    </form>
  );
}
