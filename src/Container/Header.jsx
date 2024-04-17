// Header.jsx
import React from 'react';

function Header() {
//  const [ searchQuery , setSearchQuery ] = useState("");
//  const [ proyecto , setProyecto ] = useState([]);
//  
//  const filteredProjects = searchQuery
//  ? proyecto.filter((repo) =>
//      proyecto.nombreProyecto.toLowerCase().includes(searchQuery.toLowerCase())
//    )
//  : proyecto;
//  
//  
//
//
//  const handleSearchChangeVar = async (event) => {
//    const searchTerm = event.target.value;
//    setSearchQuery(searchTerm);
//  }

  return (
    <nav className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-50 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 blur-2xl">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/login">
              <img className="h-15 w-16 max-w-16"  src="https://raw.githubusercontent.com/raulgonca/Front_stafko/main/src/Image/Logito.svg" alt="Logo" />
            </a>
          </div>
          {/* Search */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
          <div className="relative w-full max-w-lg mt-1">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              </div>
              <input id="search" className="block w-full bg-gray-900 focus:outline-none text-gray-100 placeholder-gray-400 rounded-md py-2 pl-10 pr-3 sm:text-sm mt-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} placeholder="Search" type="text" />
            </div>
          </div>
        </div>

          {/* Profile Dropdown */}
          <div className="flex items-center">
            <div className="relative ml-3">
              <p className="max-w-xs bg-gray-800 mt-1 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">

                <img className="h-8 w-8 rounded-full" src="https://cdn.icon-icons.com/icons2/1508/PNG/512/systemusers_104569.png" alt="Profile" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
