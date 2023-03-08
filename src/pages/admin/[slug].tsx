import AuthCheck from '@/components/AuthCheck/AuthCheck';
import { auth, firestore } from '@/lib/firebase';
import {
  doc,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import styles from '@/styles/Admin.module.css';
import { useForm } from 'react-hook-form';
import { Post } from '@/lib/types';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface PostFormProps {
  postRef: DocumentReference;
  defaultValue: Post;
  isPreviewing: boolean;
}

function PostForm({ postRef, defaultValue, isPreviewing }: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: defaultValue,
    mode: 'onChange',
  });

  const updatePost = async ({
    content,
    published,
  }: Pick<Post, 'content' | 'published'>) => {
    updateDoc(postRef, { content, published, updatedAt: serverTimestamp() });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      <div className="card">
        <ReactMarkdown>{watch('content')}</ReactMarkdown>
      </div>
      <div className={isPreviewing ? styles.hidden : styles.controls}>
        <textarea
          defaultValue={defaultValue.content}
          {...register('content', {
            minLength: { value: 10, message: 'post content is too short' },
            maxLength: { value: 20000, message: 'post content is too long' },
            required: { value: true, message: 'post content is required' },
          })}
        ></textarea>

        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}

        <fieldset>
          <input
            type="checkbox"
            defaultChecked={defaultValue.published}
            {...register('published')}
          />
          <label htmlFor="published">Published</label>
        </fieldset>

        <button
          type="submit"
          className="btn-green"
          disabled={!isDirty || !isValid}
        >
          Save changes
        </button>
      </div>
    </form>
  );
}

function PostManager() {
  const router = useRouter();
  const { slug } = router.query;
  const [isPreviewing, setIsPreviewing] = useState(false);

  const postRef = doc(
    firestore,
    'users',
    auth.currentUser!.uid,
    'posts',
    slug as string,
  );
  const [post] = useDocumentDataOnce(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>
            <PostForm
              postRef={postRef}
              defaultValue={post as Post}
              isPreviewing={isPreviewing}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setIsPreviewing(!isPreviewing)}>
              {isPreviewing ? 'Edit' : 'Preview'}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

export default function AdminPostEditPage() {
  return (
    <AuthCheck>
      <Head>
        <title>Edit post - NextFire</title>
      </Head>

      <PostManager />
    </AuthCheck>
  );
}
