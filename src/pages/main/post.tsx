import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { Post as IPost } from "./main.tsx";
import { auth, db } from "../../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
    post: IPost;
}
interface Like {
    userId: string;
    likeId:string;
}
export const Post = (props: Props) => {
    const { post } = props;
    const [likes, setLikes] = useState<Like[] | null>(null);
    const [user] = useAuthState(auth);
    const likesRef = collection(db, "likes");
    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
            if (user) {
                setLikes((prev) =>
                    prev ? [...prev, { userId: user?.uid,likeId:newDoc.id }] : [{ userId: user?.uid ,likeId:newDoc.id}]
                );
            }
        } catch (e) {
            console.log(e);
        }
    };
    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where("userId", "==", user?.uid), where("postId", "==", post.id));
            const likeToDeleteData = await getDocs(likeToDeleteQuery)

            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
        
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes(prev => prev && prev.filter(like=>like.likeId!==likeId))
            }
        } catch (e) {
            console.log(e);
        }
    }

    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId,likeId:doc.id })));
    };
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
    useEffect(() => {
        getLikes();
    }, []);
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{post.username}</p>
            <button onClick={hasUserLiked ? removeLike : addLike}>
                {hasUserLiked ? <>&#128078;</> : <> &#128077;</>}
            </button>
            {likes?.length && <p>Likes:{likes?.length}</p>}
        </div>
    );
};
