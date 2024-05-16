import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Colaboradores from "./Colaboradores";

const ProjectForm = ({ proyectoEditar, onClose, onProjectUpdate }) => {
  const { username } = useParams();

  const [formData, setFormData] = useState({
    nameproject: "",
    description: "",
    fechaInicio: null,
    fechaFinalizacion: null,
    owner: username,
    collaborators: [],
  });

  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [showCollaboratorsModal, setShowCollaboratorsModal] = useState(false);

  useEffect(() => {
    if (proyectoEditar) {
      const { nameproject, description, fechaInicio, fechaFinalizacion, collaborators } = proyectoEditar;
      setFormData({
        nameproject: nameproject || "",
        description: description || "",
        fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
        fechaFinalizacion: fechaFinalizacion ? new Date(fechaFinalizacion) : null,
        owner: username,
        collaborators: collaborators || [],
      });
      setSelectedCollaborators(collaborators || []);
    }
  }, [proyectoEditar, username]);

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
      collaborators: selectedCollaborators.map((collaborator) => collaborator.id),
    };

    try {
      const url = proyectoEditar ? `${process.env.REACT_APP_API_DIRECTUS}/Projects/${proyectoEditar.id}` : `${process.env.REACT_APP_API_DIRECTUS}/Projects`;
      const method = proyectoEditar ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectToSend),
      });

      if (response.ok) {
        const message = `Proyecto ${proyectoEditar ? "editado" : "creado"} correctamente.`;
        Swal.fire({
          title: "Éxito",
          text: message,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        onProjectUpdate();
        onClose();
      } else {
        throw new Error(`Error al ${proyectoEditar ? "editar" : "crear"} el proyecto: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      const errorMessage = `Ocurrió un error al ${proyectoEditar ? "editar" : "crear"} el proyecto.`;
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" >
    {showCollaboratorsModal && (
        <Colaboradores
          onClose={() => setShowCollaboratorsModal(false)}
          onSave={(selected) => {
            setSelectedCollaborators(selected);
            setShowCollaboratorsModal(false);
          }}
        />
      )}

      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6 relative" style={{ maxWidth: '30vw', maxHeight: '80vh' }}>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{proyectoEditar ? "Editar Proyecto" : "Nuevo Proyecto"}</h2>

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
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="fechainicio" className="block text-gray-700 font-bold mb-2">
              Fecha de Inicio
            </label>
            <DatePicker
              id="fechainicio"
              name="fechainicio"
              selected={formData.fechaInicio}
              onChange={(date) => handleDateChange(date, "fechaInicio")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-custom-orange"
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccionar fecha de inicio"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="fechafinalizacion" className="block text-gray-700 font-bold mb-2 ">
              Fecha de Finalización
            </label>
            <DatePicker
              id="fechafinalizacion"
              name="fechafinalizacion"
              selected={formData.fechaFinalizacion}
              onChange={(date) => handleDateChange(date, "fechaFinalizacion")}
              className="w-full  px-3 py-2 border rounded-lg focus:outline-none focus:border-custom-orange"
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccionar fecha de finalización"
              required
            />
          </div>

          <div className="flex justify-end">
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
              {proyectoEditar ? "Guardar Cambios" : "Crear Proyecto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
