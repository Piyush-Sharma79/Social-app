import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input'; // Shadcn/UI
import { Textarea } from '../../components/ui/textarea'; // Shadcn/UI
import { Button } from '../../components/ui/button'; // Shadcn/UI

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, 'posts');

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)} className="space-y-4">
      <div>
        <Input placeholder="Title" {...register('title')} />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <Textarea placeholder="Description" {...register('description')} rows={4} />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full">Post</Button>
    </form>
  );
};