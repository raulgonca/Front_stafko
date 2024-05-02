import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Widget = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      if (response.ok) {
        const data = await response.json();
        setProyectos(data);
      } else {
        throw new Error("Error al obtener los proyectos: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al cargar los proyectos. Por favor, intenta nuevamente más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleEditarProyecto = (proyecto) => {
    console.log('Editar proyecto:', proyecto);
  };

  const handleEliminarProyecto = async (proyectoId) => {
    console.log('Eliminar proyecto con ID:', proyectoId);
  };

  const ProyectoCard = ({ proyecto }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{proyecto.nameproject}</h3>
          <p className="text-gray-600">{proyecto.description}</p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handleEditarProyecto(proyecto)}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              <FaEdit className="inline-block mr-1" /> Editar
            </button>
            <button
              onClick={() => handleEliminarProyecto(proyecto.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <FaTrash className="inline-block mr-1" /> Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-grow">
        <div className="w-64 bg-zinc-200 dark:bg-zinc-700 p-4">
          <ul className="space-y-2">
            <li>
              <a href="z" className="block p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded">Users</a>
            </li>
            <li>
              <a href="h" className="block p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded">Projects</a>
            </li>
            <li>
              <a href="h" className="block p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded">Clients</a>
            </li>
          </ul>
        </div>
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {proyectos.map((proyecto) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
