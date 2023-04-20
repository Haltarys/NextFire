import { Metatags } from '@/components';
import { SignInButton, SignOutButton, UsernameForm } from '@/components/signin';
import { UserDataContext } from '@/lib/hooks/userData';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const { user, username } = useContext(UserDataContext);

  // Redirect to /admin if username is set
  useEffect(() => {
    username && router.push('/admin');
  }, [router, username]);

  return (
    <main>
      <Metatags
        title="Sign in - NextFire"
        description="Sign in to NextFire to like and write posts."
      />
      {user ? (
        username ? (
          <SignOutButton />
        ) : (
          <UsernameForm />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
