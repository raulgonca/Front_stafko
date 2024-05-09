import React from 'react';

const ProjectList = ({ proyectos, onVerDetalles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {proyectos.map((proyecto) => (
        <div key={proyecto.id} className="bg-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{proyecto.nameproject}</h3>
          <p className="text-gray-800 mb-4">{proyecto.description}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            onClick={() => onVerDetalles(proyecto)}
          >
            Ver Detalles
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
