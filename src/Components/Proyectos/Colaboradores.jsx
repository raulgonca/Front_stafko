import React, { useState, useEffect } from 'react';
import { Button, List } from 'antd';

const Colaboradores = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setAllUsers(data);
        setError(null);
      } else {
        throw new Error("Error al obtener los usuarios: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      setError("Ocurrió un error al obtener los usuarios. Por favor, inténtalo de nuevo.");
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setAllUsers(allUsers.filter((u) => u.id !== user.id));
  };

  const handleRemoveUser = (user) => {
    setAllUsers([...allUsers, user]);
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
  };

  const handleAddToProject = () => {
    // Aquí deberías implementar la lógica para agregar los usuarios seleccionados al proyecto
    console.log("Usuarios seleccionados:", selectedUsers);
    setSelectedUsers([]); // Limpiar la lista de usuarios seleccionados
  };

  const handleCloseCollaborators = () => {
    // Implementa aquí la lógica para cerrar la selección de colaboradores
    setAllUsers([...allUsers, ...selectedUsers]); // Devuelve los usuarios seleccionados a la lista de usuarios disponibles
    setSelectedUsers([]); // Limpiar la lista de usuarios seleccionados
  };
  

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {/* Lista de Usuarios y Colaboradores */}
      <div className="mt-8 grid grid-cols-2 gap-8">
        {/* Lista de Usuarios Disponibles */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Usuarios Disponibles</h2>
          <List
            dataSource={allUsers}
            renderItem={(user) => (
              <List.Item onClick={() => handleUserSelect(user)} className="cursor-pointer hover:bg-gray-100 p-3 rounded-md">
                {user.username}
              </List.Item>
            )}
          />
        </div>

        {/* Lista de Colaboradores Seleccionados */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Colaboradores Seleccionados</h2>
          <List
            dataSource={selectedUsers}
            renderItem={(user) => (
              <List.Item onClick={() => handleRemoveUser(user)} className="cursor-pointer hover:bg-gray-100 p-3 rounded-md">
                {user.username}
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="mt-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button onClick={handleCloseCollaborators}>Cerrar</Button>
        <Button type="primary" onClick={handleAddToProject} className="ml-2">
          Agregar al Proyecto
        </Button>
      </div>
    </div>
  );
};

export default Colaboradores;
