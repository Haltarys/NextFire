import { User as FirebaseUser } from 'firebase/auth';

export type User = FirebaseUser & { username: string };

export type Post = {
  title: string;
  slug: string;
  uid: string;
  content: string;
  published: boolean;
  heartCount: number;
  username: string;
  createdAt: number;
  updatedAt: number;
};
