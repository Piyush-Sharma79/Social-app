import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Post as IPost } from './main.tsx';
import { auth, db } from '../../config/firebase.ts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'; // Shadcn/UI
import { Button } from '../../components/ui/button'; // Shadcn/UI

interface Props {
  post: IPost;
}

interface Like {
  userId: string;
  likeId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [likes, setLikes] = useState<Like[] | null>(null);
  const [user] = useAuthState(auth);
  const likesRef = collection(db, 'likes');

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(likesRef, where('userId', '==', user?.uid), where('postId', '==', post.id));
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, 'likes', likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const likesDoc = query(likesRef, where('postId', '==', post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-gray-700">{post.description}</p>
        <p className="text-sm text-gray-500 italic">Posted by: {post.username}</p>
        <div className="flex items-center gap-4">
          <Button
            onClick={hasUserLiked ? removeLike : addLike}
            variant={hasUserLiked ? 'secondary' : 'default'}
            size="sm"
          >
            {hasUserLiked ? '👎 Unlike' : '👍 Like'}
          </Button>
          {likes?.length && <p className="text-gray-600 text-sm">Likes: {likes.length}</p>}
        </div>
      </CardContent>
    </Card>
  );
};