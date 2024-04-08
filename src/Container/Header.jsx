import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para manejar la navegación

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/registro">Registro</Link> {/* Enlace a la página de registro */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

