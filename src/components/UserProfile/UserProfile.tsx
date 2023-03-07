import { User } from '@/lib/types';
import styles from './UserProfile.module.css';

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className={styles['box-center']}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user.photoURL ?? ''}
        alt="Profile picture"
        referrerPolicy="no-referrer"
        className={styles['card-img-center']}
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
}
