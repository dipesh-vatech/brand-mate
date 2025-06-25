'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Post = {
  post: string;
  platform: string;
  likes: number;
  comments: number;
  saves: number;
  conversion: string;
};

type PostContextType = {
  posts: Post[];
  addPost: (post: Post) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePosts must be used within PostProvider');
  return context;
};
