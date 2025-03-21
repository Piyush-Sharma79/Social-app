import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import defaultProfile from './channels4_profile.jpg'

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Left side: Links */}
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

      {/* Right side: User info */}
      {user && (
        <div className="flex items-center gap-4">
          <p className="text-gray-800 font-medium">{user?.displayName}</p>
          <img
            src={user?.photoURL || defaultProfile}
            className="w-10 h-10 rounded-full border-2 border-gray-200"
          />
          <button
            onClick={signUserOut}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};