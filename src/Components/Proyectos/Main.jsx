import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import ProyectoForm from "./ProyectoForm";
import ConfirmDialog from "./ConfirmDialog";
import { useParams } from "react-router-dom";

const Main = () => {
  const [proyectos, setProyectos] = useState([]); // Estado para almacenar la lista de proyectos
  const [proyectoEditar, setProyectoEditar] = useState(null); // Estado para el proyecto en edición
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(null); // Estado para confirmar eliminación
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar/ocultar el formulario
  const { username } = useParams(); // Obtiene el parámetro de la URL (username)

  // Efecto de efecto secundario para cargar los proyectos del usuario cuando cambia el 'username'
  useEffect(() => {
    getUserProjects();
  }, [username]);

  // Función para obtener los proyectos del usuario desde la API
  const getUserProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/user-projects/${username}`);
      if (response.ok) {
        const data = await response.json();
        setProyectos(data); // Actualiza el estado con la lista de proyectos
      } else {
        throw new Error("Error al obtener los proyectos: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      // Mostrar alerta o mensaje de error al usuario
    }
  };

  // Función para manejar la creación de un nuevo proyecto
  const handleCrearProyecto = () => {
    setProyectoEditar(null); // Establece proyectoEditar a null para indicar una nueva creación
    setMostrarFormulario(true); // Muestra el formulario de proyecto
  };

  // Función para manejar la edición de un proyecto existente
  const handleEditarProyecto = (proyecto) => {
    setProyectoEditar(proyecto); // Establece proyectoEditar con el proyecto a editar
    setMostrarFormulario(true); // Muestra el formulario de proyecto
  };

  // Función para manejar la eliminación de un proyecto
  const handleEliminarProyecto = (proyectoId) => {
    setConfirmacionEliminar(proyectoId); // Establece confirmacionEliminar con el ID del proyecto a eliminar
  };

  // Función para confirmar la eliminación de un proyecto
  const handleConfirmarEliminar = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${confirmacionEliminar}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setConfirmacionEliminar(null); // Reinicia confirmacionEliminar
        getUserProjects(); // Vuelve a cargar la lista de proyectos después de la eliminación
      } else {
        throw new Error("Error al eliminar el proyecto: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      // Mostrar alerta o mensaje de error al usuario
    }
  };

  // Función para cerrar el diálogo de confirmación
  const handleCloseConfirmDialog = () => {
    setConfirmacionEliminar(null); // Reinicia confirmacionEliminar
  };

  // Función para cerrar el formulario de proyecto
  const handleCloseFormulario = () => {
    setMostrarFormulario(false); // Oculta el formulario de proyecto
  };

  return (
    <div className="container mx-auto p-8 mt-2">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Gestiona tus Proyectos</h1>
      <div className="mb-4">
        <button
          onClick={handleCrearProyecto}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Nuevo Proyecto
        </button>
      </div>
      {/* Renderiza la lista de proyectos */}
      <ProjectList
        proyectos={proyectos}
        onEditarProyecto={handleEditarProyecto}
        onEliminarProyecto={handleEliminarProyecto}
      />
      {/* Renderiza el formulario de proyecto si mostrarFormulario es true */}
      {mostrarFormulario && (
        <ProyectoForm
          proyectoEditar={proyectoEditar}
          onClose={handleCloseFormulario}
          onProjectUpdate={getUserProjects}
        />
      )}
      {/* Renderiza el diálogo de confirmación si confirmacionEliminar no es null */}
      {confirmacionEliminar !== null && (
        <ConfirmDialog
          titulo="¿Estás seguro?"
          mensaje="Esta acción eliminará el proyecto permanentemente."
          onConfirmar={handleConfirmarEliminar}
          onClose={handleCloseConfirmDialog}
        />
      )}
    </div>
  );
};

export default Main;
