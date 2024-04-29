import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
  return (
    <div className="bg-gray-300 text-gray-800 h-screen w-64 flex flex-col fixed left-0 top-0">
      <div className="p-4 text-xl font-bold">Dashboard</div>
      <ul className="flex-1">
        <li className="p-4 hover:bg-gray-400">
          <Link to="/proyectos" className="block">Proyectos</Link>
        </li>
        <li className="p-4 hover:bg-gray-400">
          <Link to="/clientes" className="block">Clientes</Link>
        </li>
        {/* Add more sidebar links for other sections */}
      </ul>
    </div>
  );
};

export default Sidebar;
