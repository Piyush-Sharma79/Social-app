import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import defaultProfile from './channels4_profile.jpg'; // Assuming this is your image
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'; // Shadcn/UI
import { Button } from '../components/ui/button'; // Shadcn/UI

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-500 font-semibold transition">
          Home
        </Link>
        {!user ? (
          <Link to="/login" className="text-gray-700 hover:text-blue-500 font-semibold transition">
            Login
          </Link>
        ) : (
          <Link to="/createpost" className="text-gray-700 hover:text-blue-500 font-semibold transition">
            Create Post
          </Link>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <p className="text-gray-800 font-medium">{user?.displayName}</p>
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.photoURL || defaultProfile} alt="Profile" />
            <AvatarFallback>{user?.displayName?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <Button onClick={signUserOut} variant="destructive">
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};