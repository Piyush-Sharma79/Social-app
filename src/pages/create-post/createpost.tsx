import { CreateForm } from './form.tsx';

export const CreatePost = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Create a Post
        </h1>
        <CreateForm />
      </div>
    </div>
  );
};