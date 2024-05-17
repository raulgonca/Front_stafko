import Colaboradores from './Colaboradores';
import ProyectoEdit from './ProyectoEdit';
import React, { useState } from 'react';
import Clientes from './Clientes';
import Clockify from './Clockify';

const ProyectoDetails = ({ proyecto, onSubmit }) => {
  const [isColaboradoresModalOpen, setColaboradoresModalOpen] = useState(false);
  const [isClientesModalOpen, setClientesModalOpen] = useState(false);
  const [colaboradores, setColaboradores] = useState(proyecto.colaboradores || []); // Estado para la lista de colaboradores
  const [clientes, setClientes] = useState(proyecto.clientes || []); // Estado para la lista de clientes
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

  const handleSaveClientes = (nuevosClientes) => {
    setClientes(nuevosClientes);
    setProyectoActualizado((prevProyecto) => ({
      ...prevProyecto,
      clientes: nuevosClientes,
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
    console.log("Datos a enviar:", proyectoActualizado); // Mostrar todos los cambios realizados

    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects/${proyectoActualizado.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer kLe310-xPP66p0IbJ6iyt7ww5Cvb97WX'
        },
        body: JSON.stringify(proyectoActualizado),
      });
      if (response.ok) {
        console.log("Proyecto actualizado correctamente");
        onSubmit(proyectoActualizado);
        // Reiniciar el formulario después de guardar los cambios
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

  return (
    <div className="container mx-auto px-8 py-8  rounded-lg ">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
          <ProyectoEdit
            proyectoInicial={proyectoActualizado}
            onSubmit={handleProjectUpdate}
            onProjectUpdate={handleProjectUpdate}
          />
        </div>
        <div className="w-full md:w-2/3 pl-0 md:pl-8 flex flex-col space-y-6">
          <div className="w-full">
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
          </div>
          <div className="w-full bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Colaboradores</h2>
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
          <div className="w-full">
            <button
              onClick={openClientesModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 transition duration-300"
            >
              Gestionar Clientes
            </button>
            {isClientesModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 relative" style={{ maxWidth: '70vw' }}>
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
                  <Clientes onClose={closeClientesModal} onSave={handleSaveClientes} />
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            <Clockify />
          </div>
          <div className="w-full">
            <button
              onClick={handleSaveChanges}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-6 transition duration-300"
            >
              Guardar Todos los Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectoDetails;
