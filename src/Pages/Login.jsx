import React, { useState } from 'react';
import Formulario from '../Components/Formulario/Formulario';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ setErrorMessage ] = useState('');
  const navigate = useNavigate();

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
        navigate(`/main/${ username }`);
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













