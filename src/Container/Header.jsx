// Header.jsx
import React from 'react';

function Header() {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
          <a href="/login">
              <img className="h-8 w-8 rounded-full" src="/src/Image/Logito.svg" alt="Logo" />
            </a>
          </div>
          {/* Search */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.293 14.707a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 1 1 1.414-1.414l3 3zM15 9a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <input id="search" className="block w-full bg-gray-900 focus:outline-none focus:bg-gray-100 text-gray-100 placeholder-gray-400 rounded-md py-2 pl-10 pr-3 sm:text-sm" placeholder="Search" type="text" />
              </div>
            </div>
          </div>
          {/* Profile Dropdown */}
          <div className="flex items-center">
            <div className="relative ml-3">
              <div>
                <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="data:image/png;base64,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" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
