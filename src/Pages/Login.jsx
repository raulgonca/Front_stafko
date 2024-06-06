import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Función para deshabilitar el scroll
    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };
    // Llamada a la función cuando el componente se monta
    disableScroll();
    // Limpia el efecto al desmontar el componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
        console.log('User data:', user.username, user.gmail);

        const storedHashedPassword = user.password;
        const enteredPassword = password;
        console.log('Entered password:', enteredPassword);
        console.log('Entered password:', user.password);
        // Cifrar la contraseña ingresada antes de compararla
        const hashedEnteredPassword = await bcrypt.hash(enteredPassword, 10);

        // Comparación de contraseñas utilizando bcrypt
        const passwordMatch = await bcrypt.compare(hashedEnteredPassword, storedHashedPassword);
        console.log('Password match:', passwordMatch);

        if (passwordMatch) {
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
                <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className="input-field appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-custom-orange"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Nombre de usuario'
                  required />
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
                  required />
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
