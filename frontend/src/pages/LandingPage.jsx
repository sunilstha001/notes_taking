import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    // Main container updated to a white background
    <div className="relative flex flex-col items-center justify-center min-h-screen text-gray-900 bg-white">
      {/* Background Image with a more subtle opacity */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517842645767-c6f90405774b?q=80&w=2670&auto=format&fit=crop"
          alt="Workspace"
          // Opacity reduced to be a subtle texture on the white background
          className="object-cover w-full h-full opacity-10"
        />
        {/* The dark overlay has been removed */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center p-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black">
          Capture Your Thoughts
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-600">
          A clean, simple, and modern note-taking application designed to help you focus on what matters most—your ideas.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/login">
            {/* This button style works well on both light and dark themes */}
            <button className="px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
              Login
            </button>
          </Link>
          <Link to="/register">
            {/* Button style updated to be visible on a white background */}
            <button className="px-8 py-3 font-semibold text-gray-800 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}