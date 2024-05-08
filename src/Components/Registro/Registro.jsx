import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gmail, setGmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [gmailError, setGmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;

    if (!username.trim()) {
      setUsernameError('Por favor ingresa un nombre de usuario.');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!password.trim()) {
      setPasswordError('Por favor ingresa una contraseña.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!gmail.trim()) {
      setGmailError('Por favor ingresa un correo electrónico.');
      valid = false;
    } else {
      setGmailError('');
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newUser = { username, password, gmail };
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Bienvenido',
          text: 'Registro exitoso. ¡Bienvenido!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate('/login');
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
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
              className={`input-field appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 ${usernameError && 'border-red-500'}`}
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className={`input-field appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 ${passwordError && 'border-red-500'}`}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`input-field appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 ${gmailError && 'border-red-500'}`}
              placeholder="Correo electrónico"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
            {gmailError && <p className="text-red-500 text-xs mt-1">{gmailError}</p>}
          </div>
  
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            style={{ backgroundColor: '#fd9c71', outline: 'none', ring: '2', ringOffset: '2', ringColor: 'indigo-500' }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
