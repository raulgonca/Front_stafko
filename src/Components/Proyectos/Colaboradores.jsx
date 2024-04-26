import React from "react";

const SeleccionarColaboradoresModal = ({ usuarios, onClose, onColaboradoresSeleccionados }) => {
  const handleColaboradoresSeleccionados = (e) => {
    const selectedColaboradores = Array.from(e.target.selectedOptions, (option) => option.value);
    onColaboradoresSeleccionados(selectedColaboradores);
    onClose(); // Cerrar el modal después de seleccionar
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Seleccionar Colaboradores</h2>
        <select
          multiple
          onChange={handleColaboradoresSeleccionados}
        >
          {usuarios.map((users) => (
            <option key={users.id} value={users.id} > {users.username}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SeleccionarColaboradoresModal;
