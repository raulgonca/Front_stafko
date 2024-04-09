import React, { useState, useEffect } from "react";
import ProyectoForm from "./ProyectoForm";
import ProyectoEdit from "./ProyectoEdit";
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import "./Main.css";

const Main = ({onSave, onDelete}) => {
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

    const confirmDelete = window.confirm("¿Estás seguro de borrar este proyecto?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/projects/${proyectoId}`, {
        method: "DELETE"
        
      });
      console.log(response);
      if (response.ok) {
        onDelete(proyectoId);
        console.log("proyecto eliminado" + proyectoId)
      } else {
        console.error("Error al eliminar el proyecto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
    }
  };
    

  const handleCloseFormulario = () => {
    setMostrarFormulario(false);
  };

  const handleSubmit = () => {
    handleCloseFormulario();
  };

  return (
    <div className="main-container">
      <div className="header">
        <h2>Proyectos</h2>
        <button className="crear-proyecto-btn" onClick={handleCrearProyecto}>
          <FaPlus />
        </button>
      </div>

      {mostrarFormulario && (
        <div className="ventana-emergente">
          <div className="cerrar-ventana">
            {/* Botón de cerrar */}
            <button className="cerrar-btn" onClick={handleCloseFormulario}>
              <FaTimes />
            </button>
          </div>
          <div className="contenido">
            {proyectoEditar ? (
              <ProyectoEdit proyectoInicial={proyectoEditar} onSubmit={handleSubmit} />
            ) : (
              <ProyectoForm onSubmit={handleSubmit} />
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
              <button className="eliminar-btn" onClick={() => handleEliminarProyecto(proyecto.id)}>
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
