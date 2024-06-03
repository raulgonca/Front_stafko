import { FaEdit, FaTrash } from "react-icons/fa";
import React from "react";


const ProjectCard = ({ proyecto , handleEditarProyecto, handleEliminarProyecto }) => {
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{proyecto.nameproject}</h3>
                <p className="text-gray-600">{proyecto.description}</p>
              </div>
              <div className="mt-4 bg-gray-100 py-2 px-4 rounded-lg flex justify-between">
                <button
                  onClick={() => handleEditarProyecto(proyecto)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none transition duration-300"
                >
                  <FaEdit className="inline-block mr-1" /> Editar
                </button>
                <button
                  onClick={() => handleEliminarProyecto(proyecto.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition duration-300"
                >
                  <FaTrash className="inline-block mr-1" /> Eliminar
                </button>
              </div>
            </div>
          </div>
        );
      };
export default ProjectCard;