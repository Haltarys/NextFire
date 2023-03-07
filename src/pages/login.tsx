import { SignInButton, SignOutButton, UsernameForm } from '@/components/login';
import { UserDataContext } from '@/hooks/userData';
import { useContext } from 'react';

export default function LoginPage() {
  const { user, username } = useContext(UserDataContext);

  return (
    <main>
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
