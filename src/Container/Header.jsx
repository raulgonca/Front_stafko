import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Header({ handleCancel }) {
  const { username } = useParams();
  const displayName = username || 'username';

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/login">
              <img className="h-10 w-auto" src="https://raw.githubusercontent.com/raulgonca/Front_stafko/main/src/Image/logito.svg" alt="Logo" />
            </Link>
          </div>

          {/* Username and Logout Button */}
          <div className="flex items-center ml-auto space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-2">
              <img 
                className="h-8 w-8 rounded-full" 
                src={`https://ui-avatars.com/api/?name=${displayName}&background=random`} 
                alt="User Avatar" 
              />
              <div className="text-sm font-medium text-gray-900">{displayName}</div>
            </div>
            <Link to="/login">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-black bg-custom-orange rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2"
              >
                Cerrar sesión
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
