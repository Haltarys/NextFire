import { User } from '@/lib/types';

type UserProfileProps = {
  user: User;
};

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="box-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user.photoURL || '/user.png'}
        alt="Profile picture"
        referrerPolicy="no-referrer"
        className="card-img-center"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
}
