import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Colaboradores = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(true); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    getAllUsers();
    fetchCollaborators(projectId);
  }, [projectId]);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setAllUsers(data);
      } else {
        throw new Error('Error al obtener los usuarios: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchCollaborators = async (projectId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/collaborators/${projectId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedCollaborators(data);
      } else {
        throw new Error('Error al obtener los colaboradores del proyecto');
      }
    } catch (error) {
      console.error('Error al obtener los colaboradores del proyecto:', error);
    }
  };

  const handleUserSelect = (user) => {
    const updatedUsers = [...selectedUsers, user];
    setSelectedUsers(updatedUsers);
    setAllUsers(allUsers.filter((u) => u.id !== user.id));
    setSelectedCollaborators([...selectedCollaborators, user]);
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter((u) => u.id !== user.id);
    setSelectedUsers(updatedUsers);
    setAllUsers([...allUsers, user]);
    setSelectedCollaborators(selectedCollaborators.filter((c) => c.id !== user.id));
  };

  const handleSaveChanges = async () => {
    try {
      console.log('Guardando cambios:', selectedCollaborators);
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/collaborators/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colaboradores: selectedCollaborators })
      });
  
      // Verificar el estado de la respuesta
      if (!response.ok) {
        throw new Error(`Error al realizar la solicitud: ${response.status}`);
      }
      // Convertir la respuesta a formato JSON
      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);
  
      // Una vez completada la acción de guardado, cerramos el modal
      setShowModal(false); // Actualiza el estado para cerrar el modal
  
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      // Aquí podrías manejar el error de manera adecuada, como mostrar un mensaje al usuario
      // o realizar alguna acción específica en caso de error.
    }
  };

  
  const closeModal = () => {
    // Actualiza el estado para cerrar el modal
    setShowModal(false);
  };

  return (
    <>
      {showModal && ( // Renderizar el modal solo si showModal es true
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6 relative" style={{ maxWidth: '90vw', maxHeight: '80vh' }}>
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
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

            <h2 className="text-2xl font-bold text-center mb-4">Gestión de Colaboradores</h2>

            <div className="flex flex-row">
              {/* Columna de usuarios disponibles */}
              <div className="w-1/2 pr-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                <h3 className="text-lg font-semibold mb-4">Usuarios Disponibles:</h3>
                {allUsers.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {allUsers.map((user) => (
                      <li key={user.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://cdn-icons-png.freepik.com/512/64/64572.png"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="text-base">{user.username}</span>
                        </div>
                        <button
                          onClick={() => handleUserSelect(user)}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-full transition duration-300 text-sm"
                        >
                          Añadir
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center">No hay usuarios disponibles para añadir como colaboradores.</p>
                )}
              </div>

              {/* Columna de colaboradores seleccionados */}
              <div className="w-1/2 pl-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                <h3 className="text-lg font-semibold mb-4">Colaboradores Seleccionados:</h3>
                {selectedCollaborators.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {selectedCollaborators.map((collaborator) => (
                      <li key={collaborator.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://cdn-icons-png.freepik.com/512/64/64572.png"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="text-base font-medium">{collaborator.username}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveUser(collaborator)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full transition duration-300 text-sm"
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <br />
                    <p className="text-gray-500 text-center">No hay colaboradores asociados al proyecto.</p>
                  </>
                )}
              </div>
            </div>

            {/* Botón para guardar cambios */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition duration-300"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Colaboradores;
