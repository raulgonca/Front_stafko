import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import SeleccionarColaboradoresModal from "./Colaboradores";

const ProyectoForm = ({ onSubmit, proyectoEditar }) => {
  const [proyecto, setProyecto] = useState({
    id: null,
    nameproject: "",
    description: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    colaboradores: []
  });

  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (proyectoEditar) {
      setProyecto(proyectoEditar);
    } else {
      setProyecto({
        id: null,
        nameproject: "",
        description: "",
        fechaInicio: "",
        fechaFinalizacion: "",
        colaboradores: []
      });
    }
    cargarUsuarios(); // Cargar usuarios al montar el componente
  }, [proyectoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({
      ...proyecto,
      [name]: value
    });
  };

  const handleOpenModal = () => {
    setMostrarModal(true);
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
  };

  const handleColaboradoresSeleccionados = (colaboradoresSeleccionados) => {
    setProyecto({
      ...proyecto,
      colaboradores: colaboradoresSeleccionados
    });
    handleCloseModal(); // Cerrar el modal después de seleccionar colaboradores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (proyecto.description.length >= 100) {
      Swal.fire({
        title: 'Error',
        text: 'La descripción debe tener como máximo 100 caracteres.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    try {
      const proyectoEnviar = { ...proyecto, colaboradores: proyecto.colaboradores.map(colaborador => colaborador.id) };
      
      const url = proyecto.id ? `${process.env.REACT_APP_API_URL}/projects/${proyecto.id}` : `${process.env.REACT_APP_API_URL}/projects/`;
      const method = proyecto.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyectoEnviar),
      });

      if (response.ok) {
        const mensaje = `Proyecto ${proyecto.id ? 'editado' : 'creado'} correctamente.`;
        Swal.fire({
          title: 'Éxito',
          text: mensaje,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        onSubmit();
      } else {
        throw new Error(`Error al ${proyecto.id ? 'editar' : 'crear'} el proyecto: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      const errorMessage = `Ocurrió un error al ${proyecto.id ? 'editar' : 'crear'} el proyecto.`;
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const cargarUsuarios = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data); 
      } else {
        throw new Error(`Error al cargar usuarios: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      const errorMessage = 'Ocurrió un error al cargar los usuarios.';
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="proyecto-form-container p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">{proyecto.id ? "Editar Proyecto" : "Crear Nuevo Proyecto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nameproject" className="block text-sm font-medium text-gray-700">Nombre del Proyecto:</label>
          <input
            type="text"
            id="nameproject"
            name="nameproject"
            value={proyecto.nameproject}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Ingrese el nombre del proyecto aquí"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={proyecto.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Descripción del proyecto"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            value={proyecto.fechaInicio}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fechaFinalizacion" className="block text-sm font-medium text-gray-700">Fecha de Finalización:</label>
          <input
            type="date"
            id="fechaFinalizacion"
            name="fechaFinalizacion"
            value={proyecto.fechaFinalizacion}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Botón para abrir el modal de selección de colaboradores */}
        <button
          type="button"
          onClick={handleOpenModal}
          className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Seleccionar Colaboradores
        </button>

        {/* Renderizado condicional del modal */}
        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal">
              <SeleccionarColaboradoresModal
                usuarios={usuarios}
                onClose={handleCloseModal}
                onColaboradoresSeleccionados={handleColaboradoresSeleccionados}
              />
            </div>
          </div>
        )}

        {/* Botón de submit */}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          {proyecto.id ? "Guardar Cambios" : "Crear Proyecto"}
        </button>
      </form>
    </div>
  );
};

export default ProyectoForm;
