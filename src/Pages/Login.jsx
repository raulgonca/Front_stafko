import React, { useState } from 'react';
import Formulario from '../Components/Formulario/Formulario';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        const userData = await response.json(); // Obtener datos del usuario incluyendo su ID
        localStorage.setItem('userId', userData.id); // Almacenar ID del usuario en el almacenamiento local
        console.log('Inicio de sesión exitoso');
        navigate('/main');
      } else {
        throw new Error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
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
