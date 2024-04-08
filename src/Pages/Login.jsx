import React, { useState } from 'react';
import Formulario from '../Components/Formulario/Formulario';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Cambio aquí
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(username, password)

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }) // Puedes usar shorthand aquí
      });

      if (response.ok) {
        console.log('Inicio de sesión exitoso');
        navigate(`/main/${username}`);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        // Mostrar mensaje de error utilizando SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: errorData.message
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Error al conectarse al servidor');
      // Mostrar mensaje de error utilizando SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Error al conectarse al servidor'
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
