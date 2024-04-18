import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import ProyectoForm from "./ProyectoForm";
import ProyectoEdit from "./ProyectoEdit";

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
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el proyecto permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    
    if (confirmacion.isConfirmed) {
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
    }
  };

  const handleActualizarProyectos = () => {
    getAllProject();
  };

  const handleCloseFormulario = () => {
    setMostrarFormulario(false);
  };

  const ProyectoCard = ({ proyecto }) => {
    return (
      <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg p-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{proyecto.nameproject}</h3>
          <p className="text-gray-600 mt-2">{proyecto.description}</p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleEditarProyecto(proyecto)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-600 focus:outline-none"
          >
            <FaEdit className="mr-1" /> Edit
          </button>
          <button
            onClick={() => handleEliminarProyecto(proyecto.id)}
            className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-red-600 focus:outline-none"
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      {mostrarFormulario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative z-50">
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
      )}

      <div className="max-w-screen-xl mx-auto p-6">
        <header className="flex flex-col justify-center items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Get Started with Your Projects</h2>
          <p className="text-lg text-gray-200">Manage and Create Your Projects with Ease</p>
          <button
            onClick={handleCrearProyecto}
            className="flex items-center px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none"
          >
            <FaPlus className="mr-2" /> New Project
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {proyectos.map((proyecto) => (
            <ProyectoCard
              key={proyecto.id}
              proyecto={proyecto}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;