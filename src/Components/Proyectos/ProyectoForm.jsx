import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const ProjectForm = ({ proyectoEditar, onClose, onProjectUpdate }) => {
  const [formData, setFormData] = useState({
    nameproject: "",
    description: "",
    startDate: null,
    endDate: null
  });

  useEffect(() => {
    if (proyectoEditar) {
      setFormData({
        nameproject: proyectoEditar.nameproject || "",
        description: proyectoEditar.description || "",
        startDate: proyectoEditar.startDate ? new Date(proyectoEditar.startDate) : null,
        endDate: proyectoEditar.endDate ? new Date(proyectoEditar.endDate) : null
      });
    }
  }, [proyectoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleStartDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: date
    }));
  };

  const handleEndDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      endDate: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.description.length > 100) {
      Swal.fire({
        title: 'Error',
        text: 'La descripción debe tener como máximo 100 caracteres.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const proyectoEnviar = {
      ...formData,
      startDate: formData.startDate ? formData.startDate.toISOString() : null,
      endDate: formData.endDate ? formData.endDate.toISOString() : null
    };

    try {
      const url = proyectoEditar ? `${process.env.REACT_APP_API_URL}/projects/${proyectoEditar.id}` : `${process.env.REACT_APP_API_URL}/projects`;
      const method = proyectoEditar ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(proyectoEnviar)
      });

      if (response.ok) {
        const mensaje = `Proyecto ${proyectoEditar ? 'editado' : 'creado'} correctamente.`;
        Swal.fire({
          title: 'Éxito',
          text: mensaje,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        onProjectUpdate();
        onClose(); // Cerrar el formulario después de guardar correctamente
      } else {
        throw new Error(`Error al ${proyectoEditar ? 'editar' : 'crear'} el proyecto: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      const errorMessage = `Ocurrió un error al ${proyectoEditar ? 'editar' : 'crear'} el proyecto.`;
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-w-md p-8 rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none">
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{proyectoEditar ? "Editar Proyecto" : "Nuevo Proyecto"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="nameproject">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              id="nameproject"
              name="nameproject"
              value={formData.nameproject}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="startDate">
              Fecha de Inicio
            </label>
            <DatePicker
              id="startDate"
              name="startDate"
              selected={formData.startDate}
              onChange={handleStartDateChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              dateFormat="dd/MM/yyyy"
              isClearable
              placeholderText="Seleccionar fecha de inicio"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="endDate">
              Fecha de Finalización
            </label>
            <DatePicker
              id="endDate"
              name="endDate"
              selected={formData.endDate}
              onChange={handleEndDateChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              dateFormat="dd/MM/yyyy"
              isClearable
              placeholderText="Seleccionar fecha de finalización"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose} // Cerrar el formulario al hacer clic en Cancelar
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              {proyectoEditar ? "Guardar Cambios" : "Crear Proyecto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
