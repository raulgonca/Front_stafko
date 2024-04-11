import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import ProyectoForm from "./ProyectoForm";
import ProyectoEdit from "./ProyectoEdit";
import "./Main.css";
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const Main = ({ onDelete }) => {
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
        console.error("Error al obtener los proyectos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
    }
  };

  const handleCrearProyecto = () => {
    setProyectoEditar(null); // Limpiar cualquier proyecto de edición
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
        // Mostrar una alerta SweetAlert al eliminar el proyecto
        Swal.fire({
          title: 'Proyecto eliminado',
          text: 'El proyecto ha sido eliminado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        // Actualizar la lista de proyectos después de eliminar uno
        getAllProject();
      } else {
        console.error("Error al eliminar el proyecto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
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
      <div className="header">
        <h2><u>Proyectos</u></h2>
        <button className="crear-proyecto-btn" onClick={handleCrearProyecto}>
          <FaPlus />
        </button>
      </div>

      {mostrarFormulario && (
        <div className="ventana-emergente">
          <div className="cerrar-ventana">
            <button className="cerrar-btn" onClick={handleCloseFormulario}>
              <FaTimes />
            </button>
          </div>
          <div className="contenido">
            {proyectoEditar ? (
              <ProyectoEdit proyectoInicial={proyectoEditar} onSubmit={() => handleCloseFormulario()} onProjectUpdate={handleActualizarProyectos} />
            ) : (
              <ProyectoForm onSubmit={() => handleCloseFormulario()} onProjectUpdate={handleActualizarProyectos} />
            )}
          </div>
        </div>
      )}

      <ul className="proyectos-lista">
        {proyectos.map((proyecto, index) => (
          <li className="proyecto" key={index}>
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
                // Mostrar una alerta SweetAlert para confirmar la eliminación
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
