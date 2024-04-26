import React from 'react';
import { Link } from 'react-router-dom';

function Header({ username, handleCancel, handleSearchChange }) {
  return (
    <nav className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-50 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/login" className="mr-4">
            <img className="h-10 w-auto" src="/src/Image/Logito.png" alt="Logo" />
          </Link>
        </div>
        {/* Search */}
        <div className="relative">
          <label htmlFor="search" className="sr-only"></label>
            <input
              id="search"
              className="block w-64 bg-gray-900 focus:outline-none text-base-100 placeholder-gray-400 rounded-md py-2 pl-10 pr-3 sm:text-sm"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              type="text"
              onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.5 15.5L19 19m-3.5-6.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
              />
            </svg>
          </div>
        </div>
        {/* Profile and Logout */}
        <div className="flex items-center">
          {/* Username */}
          <div className="text-sm font-medium text-gray-900 mr-4">{username}</div>
          {/* Logout Button */}
          <Link to="/login">
            <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
              Cerrar sesión
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
