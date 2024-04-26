// Importa los módulos necesarios
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Define el componente de inicio de sesión
const Login = () => {
  // Define los estados para el nombre de usuario, la contraseña y el mensaje de error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Obtiene la función de navegación para redirigir al usuario después del inicio de sesión
  const navigate = useNavigate();

  // Función para manejar el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envía la solicitud al servidor para iniciar sesión
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      // Verifica si la respuesta es exitosa
      if (response.ok) {
        console.log('Inicio de sesión exitoso');
        // Redirige al usuario a la página principal después del inicio de sesión
        navigate(`/main/${username}`);
      } else {
        // Lanza un error si la respuesta no es exitosa
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Muestra un mensaje de error al usuario si ocurre un error durante el inicio de sesión
      setErrorMessage('Credenciales incorrectas');
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Credenciales incorrectas'
      });
    }
  };

  // Renderiza el formulario de inicio de sesión
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg flex">
        {/* Logo de la empresa */}
        <div className="w-1/3 pr-4 flex justify-center items-center">
          <a href="/login">
            <img className="h-36 w-36 rounded-full" src="https://raw.githubusercontent.com/raulgonca/Front_stafko/main/src/Image/logito.svg" alt="Logo" />
          </a>
        </div>
        {/* Formulario de inicio de sesión */}
        <div className="w-2/3 pl-4">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Campo de nombre de usuario */}
            <div>
              <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="input-field appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-gray-700">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input-field appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* Botón de inicio de sesión */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
          {/* Mensaje de error */}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Exporta el componente de inicio de sesión
export default Login;
