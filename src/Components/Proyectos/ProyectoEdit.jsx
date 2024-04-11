import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./ProyectoEdit.css";

const ProyectoEdit = ({ proyectoInicial, onSubmit, onProjectUpdate }) => {
  const [proyecto, setProyecto] = useState({
    id: null,
    nameproject: "",
    description: "",
    fechaInicio: "",
    fechaFinalizacion: ""
  });

  useEffect(() => {
    if (proyectoInicial) {
      setProyecto(proyectoInicial);
    }
  }, [proyectoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto((prevProyecto) => ({
      ...prevProyecto,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/projects/${proyecto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
      });
      if (response.ok) {
        console.log("Proyecto actualizado correctamente");
        onSubmit(proyecto);
        onProjectUpdate();
        Swal.fire({
          title: 'Cambios guardados',
          text: 'Los cambios han sido guardados exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else {
        console.error("Error al actualizar el proyecto:", response.statusText);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al guardar los cambios.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al guardar los cambios.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="proyecto-edit-container">
      <h2>Editar Proyecto</h2>
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
            disabled
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
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ProyectoEdit;
