import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { Post } from './post.tsx';

export interface Post {
  id: string;
  title: string;
  description: string;
  username: string;
  userId: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, 'posts');

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="space-y-6">
      {postsList ? (
        postsList.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="text-gray-500 text-center">Login to view Posts</p>
      )}
    </div>
  );
};