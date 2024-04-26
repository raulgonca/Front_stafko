import React from 'react'


function Footer() {
  const copy = "©";
  const fullName = "Raúl González Caro";
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>{ copy } { fullName } - { currentYear }</p>
    </footer>
  );
}

export default Footer
