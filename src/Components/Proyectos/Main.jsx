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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${proyectoId}`, {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {mostrarFormulario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition duration-300">
          <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg relative z-50">
            <button
              onClick={handleCloseFormulario}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
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

      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">¡Comienza con tus Proyectos!</h1>
        <p className="text-lg text-gray-600">Gestiona y Crea tus Proyectos con Facilidad</p>
        <div className="flex justify-center">
          <button
            onClick={handleCrearProyecto}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 focus:outline-none flex items-center transition duration-300"
          >
          <FaPlus className="mr-2" /> Nuevo Proyecto
          </button>
        </div>
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
  );
};

export default Main;
