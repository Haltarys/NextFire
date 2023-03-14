import { auth, firestore } from '@/lib/firebase/firebase';
import { Post } from '@/lib/types';
import styles from '@/styles/Admin.module.css';
import {
  deleteDoc,
  doc,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Metatags from '../Metatags';
import ImageUploader from './ImageUploader';

type PostFormProps = {
  postRef: DocumentReference;
  defaultValue: Post;
  isPreviewing: boolean;
};

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
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      <div className="card">
        <ReactMarkdown>{watch('content')}</ReactMarkdown>
      </div>
      <div className={isPreviewing ? styles.hidden : styles.controls}>
        <ImageUploader />

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
            className={styles.checkbox}
            defaultChecked={defaultValue.published}
            {...register('published')}
          />
          <label htmlFor="published">Published</label>
        </fieldset>

        <button
          type="submit"
          className="btn-green w-100"
          disabled={!isDirty || !isValid}
        >
          Save changes
        </button>
      </div>
    </form>
  );
}

type DeletePostButton = {
  postRef: DocumentReference;
};

function DeletePostButton({ postRef }: DeletePostButton) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm('Are you sure you want to delete this post?');

    if (doIt) {
      await deleteDoc(postRef);
      router.push('/admin');
      toast.success('Post deleted!');
    }
  };

  return (
    <button className="btn-red" onClick={deletePost}>
      Delete
    </button>
  );
}

export default function PostManager() {
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
          <Metatags
            title={`Edit - ${post.title} - NextFire`}
            description={`Edit your post '${post.title}'.`}
          />
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
            <Link
              href={`/${post.username}/${post.slug}`}
              className="btn btn-blue"
            >
              Live view
            </Link>
            <DeletePostButton postRef={postRef} />
          </aside>
        </>
      )}
    </main>
  );
}
