import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore'; // Import the store to check login status
import { Home } from 'lucide-react'; // A nice icon for the button

export default function NotFoundPage() {
  const { userInfo } = useUserStore.getState(); // Check auth state without subscribing
  const navigate = useNavigate();

  // Determine the correct "home" path
  const homePath = userInfo ? '/dashboard' : '/';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
      <h1 className="text-8xl md:text-9xl font-extrabold text-black-600">
        404
      </h1>
      <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-md text-gray-600">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="px-6 py-3 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Go Back
        </button>
        <Link to={homePath}>
          <button className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-black rounded-md hover:bg-gray-800">
            <Home size={18} />
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}