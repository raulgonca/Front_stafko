import React, { useState, useEffect } from "react";
import "./ProyectoForm.css";

const ProyectoForm = ({ onSubmit, proyectoEditar }) => {
  const [proyecto, setProyecto] = useState({
    id: null,
    nameproject: "",
    description: "",
    fechaInicio: "",
    fechaFinalizacion: ""
  });

  // Cuando proyectoEditar cambia, actualiza el estado del proyecto
  useEffect(() => {
    if (proyectoEditar) {
      setProyecto(proyectoEditar);
    } else {
      setProyecto({
        id: null,
        nameproject: "",
        description: "",
        fechaInicio: "",
        fechaFinalizacion: ""
      });
    }
  }, [proyectoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({
      ...proyecto,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
      });
      if (response.ok) {
        console.log("Proyecto creado correctamente");
        onSubmit(); // Cerrar el formulario
        window.location.reload(); // Recargar la página
      } else {
        console.error("Error al crear el proyecto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
    }
  };

  return (
    <div>
      <h2>{proyecto.id ? "Editar Proyecto" : "Crear Nuevo Proyecto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Proyecto:</label>
          <input
            type="text"
            name="nameproject"
            value={proyecto.nameproject}
            onChange={handleChange}
            placeholder="Ingrese el nombre del proyecto aquí"
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={proyecto.description}
            onChange={handleChange}
            placeholder="Descripción del proyecto"
          />
        </div>
        <div className="form-group">
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            name="fechaInicio"
            value={proyecto.fechaInicio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fecha de Finalización:</label>
          <input
            type="date"
            name="fechaFinalizacion"
            value={proyecto.fechaFinalizacion}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{proyecto.id ? "Guardar Cambios" : "Crear Proyecto"}</button>
      </form>
    </div>
  );
};

export default ProyectoForm;
