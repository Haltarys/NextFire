import { UserDataContext } from '@/hooks/userData';
import Link from 'next/link';
import { useContext } from 'react';

interface AuthCheckProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { username } = useContext(UserDataContext);
  return (
    <>
      {username
        ? children
        : fallback ?? (
            <Link href="/login">You must be signed in to view this page.</Link>
          )}
    </>
  );
}
