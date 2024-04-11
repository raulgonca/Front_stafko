import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./ProyectoForm.css";

const ProyectoForm = ({ onSubmit, proyectoEditar }) => {
  const [proyecto, setProyecto] = useState({
    id: null,
    nameproject: "",
    description: "",
    fechaInicio: "",
    fechaFinalizacion: ""
  });

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
    if (proyecto.description.length > 100) {
      Swal.fire({
        title: 'Error',
        text: 'La descripción debe tener como máximo 100 caracteres.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
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
        onSubmit();
        window.location.reload();
      } else {
        console.error("Error al crear el proyecto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
    }
  };

  return (
    <div className="proyecto-form-container">
      <h2>{proyecto.id ? "Editar Proyecto" : "Crear Nuevo Proyecto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameproject">Nombre del Proyecto:</label>
          <input
            type="text"
            id="nameproject"
            name="nameproject"
            value={proyecto.nameproject}
            onChange={handleChange}
            placeholder="Ingrese el nombre del proyecto aquí"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={proyecto.description}
            onChange={handleChange}
            placeholder="Descripción del proyecto"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaInicio">Fecha de Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            value={proyecto.fechaInicio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaFinalizacion">Fecha de Finalización:</label>
          <input
            type="date"
            id="fechaFinalizacion"
            name="fechaFinalizacion"
            value={proyecto.fechaFinalizacion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{proyecto.id ? "Guardar Cambios" : "Crear Proyecto"}</button>
      </form>
    </div>
  );
};

export default ProyectoForm;
