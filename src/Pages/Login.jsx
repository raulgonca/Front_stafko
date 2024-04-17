import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  
      if (response.ok) {
        console.log('Inicio de sesión exitoso');
        navigate(`/main/${username}`);
      } else {
        throw new Error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Error al iniciar sesión'); // Mensaje de error genérico
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Error al iniciar sesión'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg flex">
        <div className="w-1/3 pr-4 flex justify-center"> {/* Logo de la empresa a la izquierda */}
          <a href="/login">
            <img className="h-50 w-50 rounded-full" src="https://raw.githubusercontent.com/raulgonca/Front_stafko/main/src/Image/Logito.svg" alt="Logo" />
          </a>
        </div>
        <div className="w-2/3 pl-4"> {/* Formulario a la derecha */}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="sr-only">Nombre de usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="input-field w-full"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input-field w-full"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
