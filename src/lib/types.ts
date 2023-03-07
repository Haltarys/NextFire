import { User as FirebaseUser } from 'firebase/auth';

export type User = FirebaseUser & { username: string };

export type Post = {
  title: string;
  slug: string;
  content: string;
  heartCount: number;
  username: string;
  createdAt: number;
  updatedAt: number;
};
