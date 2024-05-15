import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Users?filter[username][_eq]=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.data.length > 0) {
        const user = data.data[0];
        console.log('User data:', user);

        // Assuming user.password is the hashed password retrieved from Directus
        const storedHashedPassword = user.password;
        console.log(storedHashedPassword)
        console.log(user.password)

        // Compare the entered password with the stored hashed password
        if (storedHashedPassword === user.password) {
          console.log('Inicio de sesión exitoso');
          localStorage.setItem('directusUser', JSON.stringify(user));
          navigate(`/main/${username}`);
        } else {
          throw new Error('Credenciales incorrectas');
        }
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Credenciales incorrectas');
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Credenciales incorrectas'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg flex">
        <div className="w-1/3 pr-4 flex justify-center items-center">
          <a href="/login">
            <img className="h-36 w-36 rounded-full" src="https://raw.githubusercontent.com/raulgonca/Front_stafko/main/src/Image/logito.svg" alt="Logo" />
          </a>
        </div>
        <div className="w-2/3 pl-4 flex justify-center">
          <div className="w-full">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="input-field appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-custom-orange"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field appearance-none block w-full  text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-custom-orange"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent text-white rounded-md bg-custom-orange"
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
    </div>
  );
};

export default Login;
