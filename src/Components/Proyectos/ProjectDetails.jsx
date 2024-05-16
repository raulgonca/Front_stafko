import React, { useState } from 'react';
import ProyectoEdit from './ProyectoEdit';
import Colaboradores from './Colaboradores';
import Clientes from './Clientes';
import Clockify from './Clockify';

const ProyectoDetails = ({ proyecto, onSubmit }) => {
  const [isColaboradoresModalOpen, setColaboradoresModalOpen] = useState(false);
  const [isClientesModalOpen, setClientesModalOpen] = useState(false);

  const openColaboradoresModal = () => setColaboradoresModalOpen(true);
  const closeColaboradoresModal = () => setColaboradoresModalOpen(false);

  const openClientesModal = () => setClientesModalOpen(true);
  const closeClientesModal = () => setClientesModalOpen(false);

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
          <ProyectoEdit
            proyectoInicial={proyecto}
            onSubmit={onSubmit}
            onProjectUpdate={() => console.log('onProjectUpdate')}
          />
        </div>
        <div className="w-full md:w-2/3 pl-0 md:pl-8 flex flex-col space-y-6">
          <div className="w-full">
            <button
              onClick={openColaboradoresModal}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-6"
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
                  <Colaboradores onClose={closeColaboradoresModal} onSave={() => console.log('onSave')} />
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            <button
              onClick={openClientesModal}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-6"
            >
              Gestionar Clientes
            </button>
            {isClientesModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 relative">
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
                  <Clientes />
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            <Clockify />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectoDetails;
