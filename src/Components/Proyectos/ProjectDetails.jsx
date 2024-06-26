import React, { useState } from 'react';
import Colaboradores from '../Colaboradores/Colaboradores';
import ProyectoEdit from './ProyectoEdit';
import Clientes from '../Clientes/Clientes';
import Swal from 'sweetalert2';
import Clockify from '../Clockify/Clockify';

const ProyectoDetails = ({ proyecto, onSubmit, onClose }) => {
  const [isColaboradoresModalOpen, setColaboradoresModalOpen] = useState(false);
  const [isClientesModalOpen, setClientesModalOpen] = useState(false);
  const [colaboradores, setColaboradores] = useState(proyecto.colaboradores || []);
  const [clienteAsignado, setClienteAsignado] = useState(proyecto.clienteNombre || "");
  const [proyectoActualizado, setProyectoActualizado] = useState(proyecto);

  const openColaboradoresModal = () => setColaboradoresModalOpen(true);
  const closeColaboradoresModal = () => setColaboradoresModalOpen(false);

  const openClientesModal = () => setClientesModalOpen(true);
  const closeClientesModal = () => setClientesModalOpen(false);

  const handleSaveColaboradores = (nuevosColaboradores) => {
    setColaboradores(nuevosColaboradores);
    setProyectoActualizado(prevProyecto => ({
      ...prevProyecto,
      collaborators: nuevosColaboradores,
    }));
    closeColaboradoresModal();
  };

  const handleSaveCliente = (nuevoCliente) => {
    const nombreCliente = nuevoCliente.nombre;
    setClienteAsignado(nombreCliente);
    setProyectoActualizado(prevProyecto => ({
      ...prevProyecto,
      cliente: nombreCliente,
    }));
    closeClientesModal();
  };

  const handleProjectUpdate = (nuevoProyecto) => {
    setProyectoActualizado(prevProyecto => ({
      ...prevProyecto,
      ...nuevoProyecto,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const colaboradoresNombres = colaboradores.map(colaborador => colaborador.first_name);
      const proyectoParaGuardar = {
        id: proyectoActualizado.id,
        cliente: clienteAsignado,
        collaborators: colaboradoresNombres,
      };

      if (!proyectoParaGuardar.id) {
        throw new Error('El ID del proyecto es requerido.');
      }

      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects/${proyectoParaGuardar.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer jMmotYSthQpp8laAI9vzewV-sOfSi6NH'
        },
        body: JSON.stringify(proyectoParaGuardar),
      });

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
        throw new Error(`Hubo un error al guardar los cambios: ${response.statusText}`);
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
      Swal.fire({
        title: 'Error',
        text: `Hubo un error al eliminar el proyecto: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-6 rounded-lg mt-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
        <div className="col-span-1 lg:col-span-1 md:mr-4">
          <ProyectoEdit
            proyectoInicial={proyectoActualizado}
            onSubmit={handleProjectUpdate}
            onProjectUpdate={handleProjectUpdate}
          />
        </div>
        <div className="col-span-1 lg:col-span-1 space-y-4 md:space-y-8">
          <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2 md:mb-4">Colaboradores</h2>
            <button
              onClick={openColaboradoresModal}
              className="w-full bg-custom-purple text-white font-bold py-2 px-4 rounded mb-2 md:mb-4 transition duration-300"
            >
              Gestionar Colaboradores
            </button>
            {isColaboradoresModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="w-11/12 max-w-5xl bg-white rounded-lg shadow-lg p-8 relative">
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
                    proyecto={proyecto}
                    onClose={closeColaboradoresModal}
                    onSave={handleSaveColaboradores} />
                </div>
              </div>
            )}
            <ul>
              {colaboradores.map((collaborator) => (
                <li key={collaborator} className="py-2 border-b border-gray-300 text-center">
                  {collaborator.first_name}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2 md:mb-4">Cliente</h2>
            <button
              onClick={openClientesModal}
              className="w-full bg-custom-bluecito text-white font-bold py-2 px-4 rounded mb-2 md:mb-4 transition duration-300"
            >
              Gestionar Clientes
            </button>
            {isClientesModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="w-11/12 max-w-5xl bg-white rounded-lg shadow-lg p-8 relative" style={{ maxWidth: '140vh' }}>
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
        </div>
        <div className="col-span-1 lg:col-span-1 flex flex-col justify-center items-center mt-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <Clockify projectName={proyecto.nameproject} /> {/* Pasar el nombre del proyecto a Clockify */}
          </div>
        </div>
      </div>
      <div className="flex justify-end 20 mr-20">
        <button
          onClick={handleDeleteProject}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ml-3 mr-3 "
        >
          Eliminar Proyecto
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ml-3 mr-3"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default ProyectoDetails;
