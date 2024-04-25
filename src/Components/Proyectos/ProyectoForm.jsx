import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const ProyectoForm = ({ onSubmit, proyectoEditar }) => {
  const [proyecto, setProyecto] = useState({
    id: null,
    nameproject: "",
    description: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    colaboradores: [] // Cambiado a un array para almacenar múltiples colaboradores
  });
  
  const [usuarios, setUsuarios] = useState([]); 

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
    cargarUsuarios(); 
  }, [proyectoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({
      ...proyecto,
      [name]: value
    });
  };

  const handleSelectChange = (e) => {
    const { options } = e.target;
    const colaboradores = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        colaboradores.push(options[i].value);
      }
    }
    setProyecto({
      ...proyecto,
      colaboradores: colaboradores
    });
  };

  //const handleAgregarColaborador = (colaboradorId) => {
  //  setProyecto({
  //    ...proyecto,
  //    colaboradores: [...proyecto.colaboradores, colaboradorId]
  //  });
  //};

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

    const proyectoEnviar = { ...proyecto, colaboradores: proyecto.colaboradores.map(colaborador => colaborador.id) };

    try {
      console.log("Proyecto a enviar:", proyectoEnviar);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${proyecto.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyectoEnviar),
      });
      if (response.ok) {
        console.log("Proyecto editado correctamente");
        onSubmit();
        window.location.reload();
      } else {
        console.error("Error al editar el proyecto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
    }
  };

  const cargarUsuarios = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios`);
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data); 
      } else {
        console.error("Error al cargar usuarios:", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
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

        {/* Select para elegir colaboradores (múltiples) */}
        <div className="mb-4">
          <label htmlFor="colaboradores" className="block text-sm font-medium text-gray-700">Colaboradores:</label>
          <select
            id="colaboradores"
            name="colaboradores"
            multiple
            value={proyecto.colaboradores.map(colaborador => colaborador.id)}
            onChange={handleSelectChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>{usuario.name}</option>
            ))}
          </select>
        </div>

        {/* Botón para agregar colaboradores */}
        {/*<div className="mb-4">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleAgregarColaborador(usuarios[0].id)} // Por ejemplo, agregaremos el primer usuario de la lista
          >
            Agregar Colaborador
          </button>
        </div>*/}

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          {proyecto.id ? "Guardar Cambios" : "Crear Proyecto"}
        </button>
      </form>
    </div>
  );
};

export default ProyectoForm;
