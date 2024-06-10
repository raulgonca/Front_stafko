import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import CollaboratorList from './CollaboratorList';

const Colaboradores = ({ proyecto, onClose, onSave }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    getAllUsers();
    fetchCollaborators(proyecto);
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_REGISTER}/users`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        const filteredUsers = data.data.filter(user => !selectedCollaborators.find(collaborator => collaborator.first_name === user.first_name));
        setAllUsers(filteredUsers);
      } else {
        throw new Error('Error al obtener los usuarios: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchCollaborators = async (proyecto) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects/${proyecto.id}?fields=collaborators`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer jMmotYSthQpp8laAI9vzewV-sOfSi6NH`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        const collaboratorsStr = result.data.collaborators;

        let collaborators;
        try {
          collaborators = JSON.parse(collaboratorsStr);
        } catch (parseError) {
          console.error('Error parsing collaborators:', parseError);
          collaborators = [];
        }

        const collaboratorsObjects = collaborators.map(first_name => ({ first_name }));
        setSelectedCollaborators(collaboratorsObjects);
      } else {
        throw new Error('Error al obtener los colaboradores del proyecto: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los colaboradores:', error);
      setSelectedCollaborators([]);
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
    setSelectedCollaborators(selectedCollaborators.filter((c) => c.first_name !== user.first_name));
  };

  const handleSaveChanges = async () => {
    try {
      await onSave(selectedCollaborators);
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar los colaboradores:', error);
      // Manejar el error adecuadamente (mostrar mensaje al usuario, etc.)
    }
  };

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-full bg-white rounded-lg shadow-lg p-6 relative" style={{ maxWidth: '60vw', maxHeight: '80vh' }}>
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
              <UserList
                users={allUsers}
                onUserSelect={handleUserSelect}
              />

              <CollaboratorList
                collaborators={selectedCollaborators}
                onRemoveUser={handleRemoveUser}
              />
            </div>

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
