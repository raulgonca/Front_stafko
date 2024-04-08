import React, { useState } from 'react';
import Formulario from '../Components/Formulario/Formulario';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username: username,
        password: password
      }, {
        withCredentials: true // Envía cookies de autenticación si las hay
      });

      if (response.status === 200) {
        console.log('Inicio de sesión exitoso');
        navigate(`/main/${username}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response);
      setErrorMessage('Error al iniciar sesión'); // Mensaje de error genérico
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Error al iniciar sesión'
      });
    }
  };

  return (
    <div>
      <Formulario
        handleChangeUser={setUsername}
        handleChangePassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
