import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Console.log para imprimir el body antes de enviar la solicitud
      console.log('Body de la solicitud:', JSON.stringify({ gmail, password }));

      const response = await fetch(`${process.env.REACT_APP_API_REGISTER}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: gmail,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.access_token);
        navigate(`/main/${ gmail }`);
      } else {
        throw new Error(data.errors ? data.errors[0].message : 'Error desconocido');
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
      <div className="max-w-5xl w-full bg-custom-plus p-6 sm:p-8 rounded-lg shadow-lg flex flex-col sm:flex-row border border-custom-orange">
        <div className="w-full sm:w-1/3 pr-0 sm:pr-8 flex justify-center items-center mb-4 sm:mb-0">
          <a href="/register">
            <img className="h-24 w-24 sm:h-32 sm:w-32" src="https://raw.githubusercontent.com/raulgonca/Front_stafko/main/src/Image/logito.png" alt="Logo" />
          </a>
        </div>
        <div className="w-full sm:w-2/3 pl-0 sm:pl-4 flex justify-center">
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 text-center sm:text-left">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="input-field appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-custom-orange"
                  value={ gmail} 
                  onChange={(e) => setGmail(e.target.value)}
                  placeholder='Correo electrónico'
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="input-field appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-custom-orange"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Contraseña'
                  required
                />
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
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
