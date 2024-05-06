import React from "react";



const ConfirmDialog = ({ titulo, mensaje, onConfirmar, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h2>
        <p className="text-gray-600 mb-4">{mensaje}</p>
        <div className="flex justify-end">
          <button onClick={onConfirmar} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">
            Confirmar
          </button>
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
