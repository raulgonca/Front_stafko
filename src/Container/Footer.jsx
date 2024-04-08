import React from 'react'


function Footer() {
  const fullName = "Raúl Gonzalez Caro";
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>{fullName} - {currentYear}</p>
    </footer>
  );
}

export default Footer
