import { Metatags } from '@/components';
import { SignInButton, SignOutButton, UsernameForm } from '@/components/signin';
import { UserDataContext } from '@/lib/hooks/userData';
import { useContext } from 'react';

export default function SignInPage() {
  const { user, username } = useContext(UserDataContext);

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
