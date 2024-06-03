import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Colaboradores = ({ onClose, onSave }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]); // Asegúrate de inicializar como un array vacío
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    getAllUsers();
    fetchCollaborators(projectId);
  }, [projectId]);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer kLe310-xPP66p0IbJ6iyt7ww5Cvb97WX`
        }
      });
      if (response.ok) {
        const data = await response.json();
        // Filtrar los usuarios disponibles excluyendo aquellos que ya son colaboradores
        const filteredUsers = data.data.filter(user => !selectedCollaborators.find(collaborator => collaborator.username === user.username));
        setAllUsers(filteredUsers);
      } else {
        throw new Error('Error al obtener los usuarios: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchCollaborators = async (projectId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects/${projectId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer kLe310-xPP66p0IbJ6iyt7ww5Cvb97WX`,
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedCollaborators(data.data.collaborators || []); // Asegúrate de inicializar como un array vacío si no hay colaboradores
      } else {
        throw new Error('Error al obtener los colaboradores del proyecto: ' + response.statusText);
      }
    } catch (error) {
      console.error('Este proyecto no tienes colaboradores asignados: ', error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setAllUsers(allUsers.filter((u) => u.id !== user.id));
    setSelectedCollaborators([...selectedCollaborators, user]);
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    setAllUsers([...allUsers, user]);
    setSelectedCollaborators(selectedCollaborators.filter((c) => c.id !== user.id));
  };

  const handleSaveChanges = () => {
    onSave(selectedCollaborators);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6 relative" style={{ maxWidth: '60vw', maxHeight: '80vh' }}>
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
              <div className="w-1/2 pr-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                <h3 className="text-lg font-semibold mb-4 text-center mt-3">Usuarios Disponibles:</h3>
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
                  <>
                    <br />
                    <p className="text-gray-400 text-center">No hay usuarios disponibles para añadir como colaboradores.</p>
                  </>
                )}
              </div>

              <div className="w-1/2 pl-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                <h3 className="text-lg font-semibold mb-4 text-center mt-3">Colaboradores Seleccionados:</h3>
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
                    <p className="text-gray-400 text-center">No hay colaboradores asociados al proyecto.</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full
                transition duration-300"
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
