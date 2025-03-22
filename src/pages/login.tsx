import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button'; // Shadcn/UI

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full text-center">
        <p className="text-gray-700 text-lg mb-4">Sign in with Google to continue</p>
        <Button onClick={signInWithGoogle} className="w-full" variant="default">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.24 10.32V14.4h4.32c-.18 1.14-.66 2.04-1.44 2.76-1.2 1.14-2.88 1.86-4.92 1.86-3.9 0-7.08-3.18-7.08-7.08s3.18-7.08 7.08-7.08c1.86 0 3.54.72 4.8 1.92l3.06-3.06C16.62 1.62 14.46.48 12.24.48c-5.46 0-9.9 4.44-9.9 9.9s4.44 9.9 9.9 9.9c5.16 0 9.42-3.9 9.9-9l-9.9-.06z"
            />
          </svg>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};