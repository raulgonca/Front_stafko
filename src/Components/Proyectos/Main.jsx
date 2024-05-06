import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import ProyectoForm from "./ProyectoForm";
import ConfirmDialog from "./ConfirmDialog";

const Main = () => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoEditar, setProyectoEditar] = useState(null);
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
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
      // Manejo del error con alerta o mensaje
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

  const handleEliminarProyecto = (proyectoId) => {
    setConfirmacionEliminar(proyectoId);
  };

  const handleConfirmarEliminar = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${confirmacionEliminar}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setConfirmacionEliminar(null);
        getAllProjects();
      } else {
        throw new Error("Error al eliminar el proyecto: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      // Manejo del error con alerta o mensaje
    }
  };

  const handleCloseConfirmDialog = () => {
    setConfirmacionEliminar(null);
  };

  const handleCloseFormulario = () => {
    setMostrarFormulario(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Gestiona tus Proyectos</h1>
      <div className="mb-4">
        <button
          onClick={handleCrearProyecto}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Nuevo Proyecto
        </button>
      </div>
      <ProjectList proyectos={proyectos} onEditarProyecto={handleEditarProyecto} onEliminarProyecto={handleEliminarProyecto} />
      {mostrarFormulario && (
        <ProyectoForm
          proyectoEditar={proyectoEditar}
          onClose={handleCloseFormulario}
          onProjectUpdate={getAllProjects}
        />
      )}
      {confirmacionEliminar && (
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
