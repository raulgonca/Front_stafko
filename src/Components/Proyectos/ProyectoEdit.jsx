import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const ProyectoEdit = ({ proyectoInicial, onSubmit, onProjectUpdate }) => {
  const [proyecto, setProyecto] = useState({
    id: null,
    nameproject: "",
    description: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    collaborators: []
  });

  useEffect(() => {
    if (proyectoInicial) {
      setProyecto(proyectoInicial);
    }
  }, [proyectoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto((prevProyecto) => ({ ...prevProyecto, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (proyecto.description.length >= 120) {
      Swal.fire({
        title: 'Error',
        text: 'La descripción debe tener como máximo 100 caracteres.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects/${proyecto.id}`, {
        method: "PATCH",
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
    <div className="proyecto-edit-container p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Editar Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nameproject" className="block text-sm font-medium text-gray-700">Nombre del Proyecto :</label>
          <input
            type="text" 
            id="nameproject"
            name="nameproject"
            value={proyecto.nameproject}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-custom-orange"
            placeholder="Ingrese el nombre del proyecto aquí"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción : </label>
          <textarea
            id="description"
            name="description"
            value={proyecto.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-custom-orange"
            placeholder="Descripción del proyecto"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio :</label>
          <input
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            value={proyecto.fechaInicio}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-custom-orange"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fechaFinalizacion" className="block text-sm font-medium text-gray-700">Fecha de Finalización :</label>
          <input
            type="date"
            id="fechaFinalizacion"
            name="fechaFinalizacion"
            value={proyecto.fechaFinalizacion}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-custom-orange"
            required
          />
        </div>
        <button type="submit" className="w-full bg-custom-orange text-white font-bold py-2 px-4 rounded mt-4">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default ProyectoEdit;