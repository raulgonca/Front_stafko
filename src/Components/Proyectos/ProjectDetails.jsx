import React, { useState } from 'react';
import Colaboradores from '../Colaboradores/Colaboradores';
import ProyectoEdit from './ProyectoEdit';
import Clientes from '../Clientes/Clientes';
import Swal from 'sweetalert2';
//import Clockify from '../Clockify/Clockify';

const ProyectoDetails = ({ proyecto, onSubmit, onClose }) => {
  const [isColaboradoresModalOpen, setColaboradoresModalOpen] = useState(false);
  const [isClientesModalOpen, setClientesModalOpen] = useState(false);
  const [colaboradores, setColaboradores] = useState(proyecto.colaboradores || []);
  const [clienteAsignado, setClienteAsignado] = useState(proyecto.clienteNombre|| "");
  const [proyectoActualizado, setProyectoActualizado] = useState(proyecto);

  const openColaboradoresModal = () => setColaboradoresModalOpen(true);
  const closeColaboradoresModal = () => setColaboradoresModalOpen(false);

  const openClientesModal = () => setClientesModalOpen(true);
  const closeClientesModal = () => setClientesModalOpen(false);

  const handleSaveColaboradores = (nuevosColaboradores) => {
    setColaboradores(nuevosColaboradores);
    setProyectoActualizado((prevProyecto) => ({
      ...prevProyecto,
      collaborators: nuevosColaboradores,
    }));
    closeColaboradoresModal();
  };

  const handleSaveCliente = (nuevoCliente) => {
    const nombreCliente = nuevoCliente.nombre;
    setClienteAsignado(nombreCliente);
    setProyectoActualizado((prevProyecto) => ({
      ...prevProyecto,
      cliente: nombreCliente,
    }));
    closeClientesModal();
  };

  const handleProjectUpdate = (nuevoProyecto) => {
    setProyectoActualizado((prevProyecto) => ({
      ...prevProyecto,
      ...nuevoProyecto,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const colaboradoresNombres = colaboradores.map(colaborador => colaborador.username);
      const proyectoParaGuardar = {
        id: proyectoActualizado.id,
        cliente: clienteAsignado,
        collaborators: colaboradoresNombres,
      };

      // Validar el objeto del proyecto antes de enviarlo
      if (!proyectoParaGuardar.id) {
        throw new Error('El ID del proyecto es requerido.');
      }

      // Realizar la solicitud PATCH al servidor
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects/${proyectoParaGuardar.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer jMmotYSthQpp8laAI9vzewV-sOfSi6NH'
        },
        body: JSON.stringify(proyectoParaGuardar),
      });

      // Manejar la respuesta del servidor
      if (response.ok) {
        console.log("Proyecto actualizado correctamente");
        onSubmit(proyectoParaGuardar);
        Swal.fire({
          title: 'Cambios guardados',
          text: 'Los cambios han sido guardados exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar el proyecto:", response.statusText, errorData);
        Swal.fire({
          title: 'Error',
          text: `Hubo un error al guardar los cambios: ${response.statusText}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      Swal.fire({
        title: 'Error',
        text: `Hubo un error al guardar los cambios: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };


  const handleDeleteProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects/${proyectoActualizado.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": 'Bearer kLe310-xPP66p0IbJ6iyt7ww5Cvb97WX'
        },
      });
      if (response.ok) {
        console.log("Proyecto eliminado correctamente");
        onSubmit(null);
        onClose();
      } else {
        const data = await response.json();
        console.error("Error al eliminar el proyecto:", data);
        throw new Error('Hubo un error al eliminar el proyecto.');
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      throw new Error('Hubo un error al eliminar el proyecto.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-6 rounded-lg mt-6 mb-6 " style={{ maxWidth: '95vw', maxHeight: '90vh' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
        <div className="col-span-1">
          <ProyectoEdit
            proyectoInicial={proyectoActualizado}
            onSubmit={handleProjectUpdate}
            onProjectUpdate={handleProjectUpdate}
          />
        </div>
        <div className="col-span-2 space-y-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4"> Colaboradores </h2>
            <button
              onClick={openColaboradoresModal}
              className="w-full bg-custom-purple text-white
              font-bold py-2 px-4 rounded mb-4 transition duration-300"
            >
              Gestionar Colaboradores
            </button>
            {isColaboradoresModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 relative">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={closeColaboradoresModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <Colaboradores 
                      projectId={proyecto} 
                      onClose={closeColaboradoresModal} 
                      onSave={handleSaveColaboradores} />
                </div>
              </div>
            )}
            {colaboradores.length > 2 ? (
              <div className="max-h-[10rem] overflow-y-auto">
                <ul>
                  {colaboradores.map((collaborator, index) => (
                    <li key={index} className="py-2 border-b border-gray-300 text-center">
                      {collaborator.username}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ul>
                {colaboradores.map((collaborator, index) => (
                  <li key={index} className="py-2 border-b border-gray-300 text-center">
                    {collaborator.username}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Cliente</h2>
            <button
              onClick={openClientesModal}
              className="w-full bg-custom-bluecito text-white font-bold py-2 px-4 rounded mb-4 transition duration-300"
            >
              Gestionar Clientes
            </button>
            {isClientesModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75" >
                <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 relative" style={{ maxWidth: '140vh' }}>
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={closeClientesModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <Clientes
                    onClienteSeleccionado={handleSaveCliente}
                    onClose={closeClientesModal}
                    clientesSeleccionados={[clienteAsignado]} 
                  />
                </div>
              </div>
            )}
            {clienteAsignado ? (
              <p className='text-center'>{clienteAsignado}</p>
            ) : (
              <p className='text-center'>No hay cliente asignado.</p>
            )}
          </div>
          <div className="flex justify-center space-x-8">
            <button
              onClick={handleSubmit}
              className="bg-custom-orange text-white font-bold py-2 px-4 rounded"
            >
              Guardar Colaboradores/Clientes
            </button>
            <button
              onClick={handleDeleteProject}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar Proyecto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectoDetails;