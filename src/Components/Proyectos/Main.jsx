import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Swal from 'sweetalert2';
import { FaPlus, FaTimes } from 'react-icons/fa';
import ProyectoForm from "./ProyectoForm";
import ProyectoEdit from "./ProyectoEdit";

const ProyectoCard = ({ proyecto, onEditar, onEliminar }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{proyecto.nameproject}</h3>
        <p className="text-gray-600 mt-2">{proyecto.description}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEditar(proyecto)}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none"
        >
          Editar
        </button>
        <button
          onClick={() => onEliminar(proyecto.id)}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-red-700 focus:outline-none"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};


const Main = () => {
  const [proyectos, setProyectos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [proyectoEditar, setProyectoEditar] = useState(null);

  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = async () => {
    try {
      const response = await fetch("http://localhost:3000/projects/");
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

  const handleCrearProyecto = () => {
    setProyectoEditar(null);
    setMostrarFormulario(true);
  };

  const handleEditarProyecto = (proyecto) => {
    setProyectoEditar(proyecto);
    setMostrarFormulario(true);
  };

  const handleEliminarProyecto = async (proyectoId) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${proyectoId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        Swal.fire({
          title: 'Proyecto eliminado',
          text: 'El proyecto ha sido eliminado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        getAllProject();
      } else {
        throw new Error("Error al eliminar el proyecto: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar el proyecto. Por favor, intenta nuevamente más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleActualizarProyectos = () => {
    getAllProject();
  };

  const handleCloseFormulario = () => {
    setMostrarFormulario(false);
  };

  const modalContainer = document.getElementById('modal-container');

  return (
    <>
      {ReactDOM.createPortal(
        mostrarFormulario ? (
          <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg relative z-50">
              <button
                onClick={handleCloseFormulario}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes />
              </button>
              <div className="form-container">
                {proyectoEditar ? (
                  <ProyectoEdit
                    proyectoInicial={proyectoEditar}
                    onSubmit={handleCloseFormulario}
                    onProjectUpdate={handleActualizarProyectos}
                  />
                ) : (
                  <ProyectoForm
                    onSubmit={handleCloseFormulario}
                    onProjectUpdate={handleActualizarProyectos}
                  />
                )}
              </div>
            </div>
          </div>
        ) : null,
        modalContainer
      )}

      <div className="max-w-4xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Proyectos</h2>
          <button
            onClick={handleCrearProyecto}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none"
          >
            <FaPlus className="mr-2" /> Nuevo Proyecto
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {proyectos.map((proyecto) => (
            <ProyectoCard
              key={proyecto.id}
              proyecto={proyecto}
              onEditar={handleEditarProyecto}
              onEliminar={handleEliminarProyecto}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
