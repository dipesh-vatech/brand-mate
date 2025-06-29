'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

type Post = {
  id?: string;
  post: string;
  platform: string;
  likes: number;
  comments: number;
  saves: number;
  conversion: string;
  created_at?: string;
};

type PostContextType = {
  posts: Post[];
  addPost: (post: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch posts:', error.message);
    } else if (data) {
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (post: Post) => {
    const { error } = await supabase.from('posts').insert([post]);
    if (error) {
      console.error('Error saving post:', error.message);
      return;
    }
    await fetchPosts(); // Refresh after insert
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete post:', error.message);
    } else {
      await fetchPosts(); // or however you reload the data
    }
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePosts must be used within PostProvider');
  return context;
};
