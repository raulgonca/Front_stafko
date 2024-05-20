import React, { useState } from 'react';
import Colaboradores from './Colaboradores';
import ProyectoEdit from './ProyectoEdit';
import Clientes from './Clientes';
import Clockify from './Clockify';

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
    setProyectoActualizado((prevProyecto) => ({
      ...prevProyecto,
      colaboradores: nuevosColaboradores,
    }));
    closeColaboradoresModal();
  };

  const handleSaveCliente = (nuevoCliente) => {
    const nombreCliente = nuevoCliente.nombre;
    setClienteAsignado(nombreCliente);
    setProyectoActualizado((prevProyecto) => ({
      ...prevProyecto,
      clienteNombre: nombreCliente,
    }));
    closeClientesModal();
  };

  const handleProjectUpdate = (nuevoProyecto) => {
    setProyectoActualizado((prevProyecto) => ({
      ...prevProyecto,
      ...nuevoProyecto,
    }));
  };

  const handleSaveChanges = async () => {
    const proyectoParaGuardar = {
      ...proyectoActualizado,
      clienteNombre: clienteAsignado,
    };

    console.log("Datos a enviar:", proyectoParaGuardar);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects/${proyectoActualizado.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer kLe310-xPP66p0IbJ6iyt7ww5Cvb97WX'
        },
        body: JSON.stringify(proyectoParaGuardar),
      });
      if (response.ok) {
        console.log("Proyecto actualizado correctamente");
        onSubmit(proyectoParaGuardar);
        setProyectoActualizado(proyecto);
      } else {
        console.error("Error al actualizar el proyecto:", response.statusText);
        throw new Error('Hubo un error al guardar los cambios.');
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      throw new Error('Hubo un error al guardar los cambios.');
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
        console.error("Error al eliminar el proyecto:", response.statusText);
        throw new Error('Hubo un error al eliminar el proyecto.');
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      throw new Error('Hubo un error al eliminar el proyecto.');
    }
  };

  return (
    <div className="container mx-auto px-8 py-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <ProyectoEdit
            proyectoInicial={proyectoActualizado}
            onSubmit={handleProjectUpdate}
            onProjectUpdate={handleProjectUpdate}
          />
        </div>
        <div className="col-span-2 space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">Colaboradores</h2>
            <button
              onClick={openColaboradoresModal}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-6 mt-5 transition duration-300"
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
                  <Colaboradores onClose={closeColaboradoresModal} onSave={handleSaveColaboradores} />
                </div>
              </div>
            )}
            {colaboradores.length > 0 ? (
              <ul>
                {colaboradores.map((colaborador, index) => (
                  <li key={index} className="py-2 border-b border-gray-300">
                    {colaborador.username}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay colaboradores añadidos.</p>
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">Cliente</h2>
            <button
              onClick={openClientesModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 transition duration-300"
            >
              Gestionar Clientes
            </button>
            {isClientesModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 relative" style={{                  maxWidth: '70vw' }}>
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
                    clientesSeleccionados={[clienteAsignado]} // Pasar clientes ya seleccionados
                  />
                </div>
              </div>
            )}
            {clienteAsignado ? (
              <p>{clienteAsignado}</p>
            ) : (
              <p>No hay cliente asignado.</p>
            )}
          </div>
          <div>
            <Clockify />
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handleSaveChanges}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Guardar Todos los Cambios
        </button>
        <button
          onClick={handleDeleteProject}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Eliminar Proyecto
        </button>
      </div>
    </div>
  );
};

export default ProyectoDetails;

