import React, { useState, useEffect } from 'react';
//import api from './api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/clientes`);
      setClientes(response.data);
    };

    fetchClientes();
  }, []);

  const handleSearch = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/clientes/search?nombre=${searchQuery}`);
    setClientes(response.data);
  };

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar por nombre..."
      />
      <button onClick={handleSearch}>Buscar</button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>CIF</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Nombre de la Empresa</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.cif}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.email}</td>
              <td>{cliente.nombreEmpresa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;
