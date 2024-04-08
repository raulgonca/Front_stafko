import React, { useState, useEffect } from "react";
import ProyectoForm from "./ProyectoForm";
import "./Main.css";

const Main = () => {
  const [proyectos, setProyectos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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

  const handleCrearProyecto = async (proyecto) => {
    try {
      const response = await fetch("http://localhost:3000/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(proyecto)
      });
      if (response.ok) {
        const proyectoCreado = await response.json();
        setProyectos([...proyectos, proyectoCreado]);
        toggleFormulario();
      } else {
        console.error("Error al guardar el proyecto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
    }
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

//Mirar mejor este metodo
//  const handleEliminarProyecto = async () => {
//    try {
//      const response = await fetch(`http://localhost:3000/projects/${projects.id}`, {
//        method: "DELETE"
//      });
//      if (response.ok) {
//        setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
//      } else {
//        console.error("Error al eliminar el proyecto:", response.statusText);
//      }
//    } catch (error) {
//      console.error("Error al comunicarse con el servidor:", error);
//    }
//  };

  const handleEditarProyecto = (id) => {
    // Lógica para editar el proyecto con el ID proporcionado
    console.log("Editar proyecto con ID:", id);
    // Aquí deberías implementar la lógica para editar el proyecto
  };

  return (
    <div className="main-container">
      <div className="header">
        <h2>Proyectos</h2>
        <button className="crear-proyecto-btn" onClick={toggleFormulario}>✛</button>
      </div>

      {mostrarFormulario && (
        <div className="ventana-emergente">
          <div className="contenido">
            <ProyectoForm onSubmit={handleCrearProyecto} />
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
              <button className="editar-btn" onClick={() => handleEditarProyecto(proyecto.id)}>Editar</button>
              {/* <button className="eliminar-btn" onClick={() => handleEliminarProyecto(proyecto.id)}>Eliminar</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
