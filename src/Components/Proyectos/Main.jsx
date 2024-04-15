// Importa useState, useEffect y otras dependencias necesarias
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import ProyectoForm from "./ProyectoForm";
import ProyectoEdit from "./ProyectoEdit";
import "./Main.css";
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const Main = () => {
  const [proyectos, setProyectos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [proyectoEditar, setProyectoEditar] = useState(null);

  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Obtener el ID del usuario desde el almacenamiento local
      const response = await fetch(`http://localhost:3000/projects/user/${userId}`);
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

  return (
    <div className="main-container">
      <header className="header">
        <h2>Proyectos</h2>
        <button className="crear-proyecto-btn" onClick={handleCrearProyecto}>
          <FaPlus />
        </button>
      </header>

      {mostrarFormulario && (
        <div className="modal" onClick={handleCloseFormulario}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseFormulario}>
              <FaTimes />
            </button>
            <div className="form-container">
              {proyectoEditar ? (
                <ProyectoEdit proyectoInicial={proyectoEditar} onSubmit={handleCloseFormulario} onProjectUpdate={handleActualizarProyectos} />
              ) : (
                <ProyectoForm onSubmit={handleCloseFormulario} onProjectUpdate={handleActualizarProyectos} />
              )}
            </div>
          </div>
        </div>
      )}

      <ul className="proyectos-lista">
        {proyectos.map((proyecto) => (
          <li className="proyecto" key={proyecto.id}>
            <div className="proyecto-info">
              <div><strong>Nombre:</strong> {proyecto.nameproject}</div>
              <div><strong>Descripción:</strong> {proyecto.description}</div>
              <div><strong>Fecha Inicio:</strong> {proyecto.fechaInicio}</div>
              <div><strong>Fecha Finalización:</strong> {proyecto.fechaFinalizacion}</div>
            </div>
            <div className="botones-proyecto">
              <button className="editar-btn" onClick={() => handleEditarProyecto(proyecto)}>
                <FaEdit />
              </button>
              <button className="eliminar-btn" onClick={() => {
                Swal.fire({
                  title: '¿Estás seguro?',
                  text: '¿Estás seguro de que deseas eliminar este proyecto?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Sí, eliminar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleEliminarProyecto(proyecto.id);
                  }
                });
              }}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
