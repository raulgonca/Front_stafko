import { Link, useParams } from 'react-router-dom';
import React from 'react';

function Header({ handleCancel }) {
  const { username } = useParams(); // Extrae el parámetro username de la URL

  return (
    <nav className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/login" className="mr-4">
            <img className="h-10 w-auto" src="https://raw.githubusercontent.com/raulgonca/Front_stafko/main/src/Image/logito.svg" alt="Logo" />
          </Link>
        </div>

        {/* Username and Logout Button */}
        <div className="flex items-center ml-auto">
          <div className="text-sm font-medium text-gray-900 mr-4">{username}</div>
          <Link to="/login">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Cerrar sesión
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
