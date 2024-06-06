import React from 'react';

const CollaboratorList = ({ collaborators, onRemoveUser }) => {
  return (
    <div className="w-1/2 pl-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
      <h3 className="text-lg font-semibold mb-4 text-center mt-3">Colaboradores Seleccionados:</h3>
      {collaborators.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {collaborators.map((collaborator, index) => (
            <li key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <img
                  src="https://cdn-icons-png.freepik.com/512/64/64572.png"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-base font-medium">{collaborator.username}</span>
              </div>
              <button
                onClick={() => onRemoveUser(collaborator)}
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
  );
};

export default CollaboratorList;
