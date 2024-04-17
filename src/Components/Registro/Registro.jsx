import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Obtener la función navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { username, password, email };
      
      const response = await fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login'); // Navegar a la página de login después del registro exitoso
      } else {
        throw new Error(data.message);
      }

      //Simplemente mostraremos un mensaje de éxito
      Swal.fire({
        title: 'Bienvenido',
        text: 'Registro exitoso. ¡Bienvenido!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Registro</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="input-field"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="input-field"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input-field"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
