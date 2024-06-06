import React from 'react'

function Footer() {
  const copy = "©";
  const fullName = "Raúl González";
  const currentYear = new Date().getFullYear();

  return (
    <footer>
        <p>{ copy } { currentYear } - { fullName } </p> 
        <p className="ml-3">Proyecto Practicas </p>
    </footer>
  );
}

export default Footer
