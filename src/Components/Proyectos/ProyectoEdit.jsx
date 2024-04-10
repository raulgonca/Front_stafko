import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./ProyectoEdit";

const EditarProyectoForm = ({ proyectoInicial, onSubmit, onProjectUpdate }) => {
  const [proyecto, setProyecto] = useState({
    id: null,
    nameproject: "",
    description: "",
    fechaInicio: "",
    fechaFinalizacion: ""
  });

  // Actualiza el estado del proyecto cuando proyectoInicial cambia
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
        onSubmit(proyecto); // Informar al componente padre que el proyecto ha sido actualizado
        onProjectUpdate(); // Llamar a la función de actualización para actualizar Main
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
    <div>
      <h2>Editar Proyecto</h2>
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
            disabled
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
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProyectoForm;
