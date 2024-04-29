import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import ProyectoForm from "./ProyectoForm";
import ProyectoEdit from "./ProyectoEdit";
//import Sidebar from './Sidebar';


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
    <div className="flex">
      {/*<Sidebar />*/ }
      <div className="flex-1 p-8 ml-64"> {/* Añadimos ml-64 para ajustar el espacio a la izquierda del Sidebar */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Gestiona tus Proyectos</h1>
          <p className="text-lg text-gray-600">Organiza tus proyectos de manera eficiente</p>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 focus:outline-none"
          >
            <FaPlus className="mr-2" /> Nuevo Proyecto
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((proyecto) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>

        {mostrarFormulario && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white max-w-lg p-8 rounded-lg shadow-lg">
              <button
                onClick={() => setMostrarFormulario(false)}
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <FaTimes />
              </button>
              <div className="form-container">
                {proyectoEditar ? (
                  <ProyectoEdit
                    proyectoInicial={proyectoEditar}
                    onSubmit={() => setMostrarFormulario(false)}
                    onProjectUpdate={getAllProject}
                  />
                ) : (
                  <ProyectoForm
                    onSubmit={() => setMostrarFormulario(false)}
                    onProjectUpdate={getAllProject}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
