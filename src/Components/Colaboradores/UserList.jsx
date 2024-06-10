import React from 'react';

const UserList = ({ users, onUserSelect }) => {
  return (
    <div className="w-1/2 pr-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
      <h3 className="text-lg font-semibold mb-4 text-center mt-3">Usuarios Disponibles:</h3>
      {users.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <img
                  src="https://cdn-icons-png.freepik.com/512/64/64572.png"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-base">{user.first_name}</span>
              </div>
              <button
                onClick={() => onUserSelect(user)}
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
  );
};

export default UserList;
