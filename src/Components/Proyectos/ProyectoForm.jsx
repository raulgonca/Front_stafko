import React, { useState } from "react";
import "./ProyectoForm.css"

const ProyectoForm = ({ onSubmit, proyectoInicial }) => {
  const [proyecto, setProyecto] = useState(proyectoInicial || {
    id: null,
    nameproject: "",
    description: "",
    fechaInicio: "",
    fechaFinalizacion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({
      ...proyecto,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(proyecto);
    setProyecto({
      id: null,
      nameproject: "",
      description: "",
      fechaInicio: "",
      fechaFinalizacion: ""
    });
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
