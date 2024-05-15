import React, { useState, useEffect } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientes(); // Llamar a la función fetchClientes al montar el componente
  }, []); // El array de dependencias está vacío para que se ejecute solo una vez al montar

  const fetchClientes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Clientes`);
      if (!response.ok) {
        throw new Error('Error al obtener los clientes');
      }
      const data = await response.json();
      setClientes(data.data); // Ajuste para la estructura de respuesta de Directus
      setError(null); // Reiniciamos el error si se recuperan los datos correctamente
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      setError('Error al obtener los clientes');
      setClientes([]); // Aseguramos que clientes sea un array vacío en caso de error
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Evitar la recarga de la página por defecto
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Clientes?filter[nombre][_contains]=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Error al buscar clientes');
      }
      const data = await response.json();
      setClientes(data.data); // Ajuste para la estructura de respuesta de Directus
      setError(null); // Reiniciamos el error si se recuperan los datos correctamente
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      setError('Error al buscar clientes');
      setClientes([]); // Aseguramos que clientes sea un array vacío en caso de error
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-orange"
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 bg-custom-orange text-white rounded-lg hover:bg-custom-orange focus:outline-none"
        >
          Buscar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-custom-orange text-white">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">CIF</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Nombre de la Empresa</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="text-gray-800">
                <td className="border px-4 py-2">{cliente.nombre}</td>
                <td className="border px-4 py-2">{cliente.cif}</td>
                <td className="border px-4 py-2">{cliente.telefono}</td>
                <td className="border px-4 py-2">{cliente.email}</td>
                <td className="border px-4 py-2">{cliente.nombreEmpresa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
