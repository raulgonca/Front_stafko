import React, { useState } from 'react';
import '../Formulario/Formulario.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Obtener la función navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { username, password, email };
      
      const response = await fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login'); // Navegar a la página de login después del registro exitoso
      } else {
        throw new Error(data.message);
      }

      //Simplemente mostraremos un mensaje de éxito
      Swal.fire({
        title: 'Bienvenido',
        text: 'Registro exitoso. ¡Bienvenido!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input type="text" 
                 value={username} 
                 onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password"
                 value={password} 
                 onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" 
                 value={email} 
                 onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;
