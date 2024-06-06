  import "react-datepicker/dist/react-datepicker.css";
  import React, { useState } from "react";
  import { useParams } from "react-router-dom";
  import { FaTimes } from "react-icons/fa";
  import { AiOutlineCalendar } from "react-icons/ai";
  import DatePicker from "react-datepicker";
  import Swal from "sweetalert2";

  const ProjectForm = ({ onClose, onProjectUpdate }) => {
    const { username } = useParams();

    const [formData, setFormData] = useState({
      nameproject: "",
      description: "",
      fechaInicio: null,
      fechaFinalizacion: null,
      owner: username,
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleDateChange = (date, field) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: date,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.description.length > 100) {
        Swal.fire({
          title: "Error",
          text: "La descripción debe tener como máximo 100 caracteres.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const projectToSend = {
        ...formData,
        fechaInicio: formData.fechaInicio ? formData.fechaInicio.toISOString() : null,
        fechaFinalizacion: formData.fechaFinalizacion ? formData.fechaFinalizacion.toISOString() : null,
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectToSend),
        });

        if (response.ok) {
          Swal.fire({
            title: "Éxito",
            text: "Proyecto creado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          onProjectUpdate();
          onClose();
        } else {
          throw new Error("Error al crear el proyecto: " + response.statusText);
        }
      } catch (error) {
        console.error("Error al comunicarse con el servidor:", error);
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al crear el proyecto.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuevo Proyecto</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nameproject" className="block text-gray-700 font-bold mb-2">
                Nombre del Proyecto
              </label>
              <input
                type="text"
                id="nameproject"
                name="nameproject"
                value={formData.nameproject}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-custom-orange"
                placeholder="Nombre del proyecto"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-custom-orange"
                rows="4"
                placeholder="Breve descripción del proyecto"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="fechainicio" className="block text-gray-700 font-bold mb-2">
                Duración del Proyecto
              </label>
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <AiOutlineCalendar className="text-gray-500 dark:text-gray-400 mr-2" />
                    <DatePicker
                      selected={formData.fechaInicio}
                      onChange={(date) => handleDateChange(date, "fechaInicio")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-orange focus:border-custom-orange block w-full p-2.5 " // Añadido border-custom-orange
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Fecha Inicio"
                      required
                    />
                  </div>
                  <span className="mx-4 text-gray-500">Hasta</span>
                  <div className="flex items-center">
                    <AiOutlineCalendar className="text-gray-500 dark:text-gray-400 mr-2" />
                    <DatePicker
                      selected={formData.fechaFinalizacion}
                      onChange={(date) => handleDateChange(date, "fechaFinalizacion")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-orange focus:border-custom-orange block w-full p-2.5 " // Añadido border-custom-orange
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Fecha Finalización"
                      required
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-custom-orange text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Crear Proyecto
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default ProjectForm;
