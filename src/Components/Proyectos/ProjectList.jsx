import ProyectoDetails from './ProjectDetails';
import React, { useState } from 'react';

const ProjectList = ({ proyectos }) => {
  const [selectedProyecto, setSelectedProyecto] = useState(null);

  const handleVerDetalles = (proyecto) => {
    setSelectedProyecto(proyecto);
  };

  const closeProyectoDetails = () => {
    setSelectedProyecto(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" style={{ maxWidth: '90vw', maxHeight: '600h' }}>
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="bg-gray-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{proyecto.nameproject}</h3>
            <p className="text-gray-800 mb-6">{proyecto.description}</p>
            <button
              className="bg-custom-orange text-white font-bold py-2 px-4 rounded focus:outline-none border-5 border-gray-300"
              onClick={() => handleVerDetalles(proyecto)}
            >
              Ver Detalles
            </button>
          </div>
        ))}
      </div>
      {selectedProyecto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeProyectoDetails}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ProyectoDetails proyecto={selectedProyecto} onSubmit={() => console.log('onSubmit')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
