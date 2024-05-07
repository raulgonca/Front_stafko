import React, { useState, useEffect } from 'react';

const Colaboradores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llama a la función para obtener todos los usuarios cuando se abre el modal
    if (isModalOpen) {
      getAllUsers();
    }
  }, [isModalOpen]);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setSelectedUsers(data);
        setError(null); // Reiniciar el estado de error si la solicitud tiene éxito
      } else {
        throw new Error("Error al obtener los usuarios: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      setError("Ocurrió un error al obtener los usuarios. Por favor, inténtalo de nuevo."); // Configurar el estado de error
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]); // Agregar usuario seleccionado
    setIsModalOpen(false); // Cerrar el modal después de seleccionar
  };

  return (
    <div className="container mx-auto p-8">
      {/* Modal de Selección de Usuarios */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white max-w-md p-8 rounded-lg shadow-lg text-black">
            {/* Contenido del modal */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seleccionar Usuarios</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar error si existe */}
            <button onClick={getAllUsers} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none mb-4">
              Cargar Usuarios
            </button>
            {/* Lista de usuarios seleccionables */}
            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
              {selectedUsers.map((user) => (
                <li key={user.id} className="py-2">
                  <button onClick={() => handleUserSelect(user)} className="text-left w-full text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md focus:outline-none">
                    {user.name}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 focus:outline-none">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Contenido principal de la página */}
      <div className="bg-white text-black p-8">
        <div className="border rounded p-4">
          <div className="flex justify-between items-center mb-6">
            <input type="text" placeholder="Buscar" className="bg-gray-200 border rounded p-2 w-full" />
            <button onClick={handleOpenModal} className="ml-4 bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <h2 className="text-lg font-semibold mb-2">Usuarios</h2>
              <ul>
                {selectedUsers.map((user) => (
                  <li key={user.username} className="text-black-800">{user.usersname}</li>
                ))}
              </ul>
            </div>
            <div className="border rounded p-4">
              <h2 className="text-lg font-semibold mb-2">Colaboradores</h2>
              <button onClick={handleOpenModal} className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none">
                Seleccionar Colaboradores
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colaboradores;
