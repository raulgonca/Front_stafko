import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Header({ handleCancel }) {
  const { username } = useParams();
  let displayName = username || 'username';

  // Convertir la primera letra del nombre a mayúscula
  displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

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
              <div className="text-base text-gray-900 ml-2 mr-2">{displayName}</div>
              <img 
                className="h-8 w-8 rounded-full" 
                src={`https://ui-avatars.com/api/?name=${displayName}&background=random`} 
                alt="User Avatar" 
              />
            </div>
            <Link to="/login">
              <button
                onClick={handleCancel}
                className="px-2 py-2 text-sm font-medium text-black bg-custom-orange hover:bg-orange-700 focus:outline-none focus:ring-2 rounded-full" >
                <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
