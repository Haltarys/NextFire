import { UserDataContext } from '@/lib/hooks/userData';
import Link from 'next/link';
import { useContext } from 'react';

type AuthCheckProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { user, username } = useContext(UserDataContext);

  return (
    <>
      {user && username
        ? children
        : fallback ?? (
            <Link href="/signin">You must be signed in to view this page.</Link>
          )}
    </>
  );
}
