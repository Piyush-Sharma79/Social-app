import { CreateForm } from './form.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'; // Shadcn/UI

export const CreatePost = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 text-center">Create a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateForm />
        </CardContent>
      </Card>
    </div>
    
  );
};