import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const Contacto = ({ onClose }) => {
  const frmContact = { userEmail: '', concernCategory: '', emailTitle: '', emailDetails: '' };
  const [contact, setContact] = useState(frmContact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send('default_service', 'template_5ai3oao', contact, 'iGslFMQnHvoPnYpc1')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setContact(frmContact);
        Swal.fire({
          title: '¡Correo enviado!',
          text: "Tu correo ha sido enviado correctamente.",
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      })
      .catch((err) => {
        console.log('FAILED...', err);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar el correo. Por favor, intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative bg-white p-6 rounded-lg shadow-lg container max-w-lg text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mb-4">
          <p className="text-xl font-semibold text-gray-700">
            Contacta con nosotros a través de tu Gmail
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-800">Rellene este formulario con lo que nos quiera comentar</h3>
          </div>
          <div className="mb-4">
            <div className="form-group text-left">
              <label htmlFor="userEmail" className="block text-lg font-medium text-gray-700"><b>Tu Correo Electrónico</b></label>
              <input 
                required 
                type="email" 
                value={contact.userEmail} 
                name="userEmail" 
                id="userEmail" 
                onChange={handleChange} 
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-custom-orange" 
                placeholder="Tu correo electrónico" 
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="form-group text-left">
              <label htmlFor="concernCategory" className="block text-lg font-medium text-gray-700"><b>Categoría de Preocupación</b></label>
              <select 
                required 
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-custom-orange" 
                value={contact.concernCategory} 
                onChange={handleChange} 
                name="concernCategory"
                id="concernCategory"
              >
                <option value=""> ------ </option>
                <option value="info">Información</option>
                <option value="buy">Error</option>
                <option value="play tennis">Propuestas</option>
                <option value="other">Otro</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <div className="form-group text-left">
              <label htmlFor="emailTitle" className="block text-lg font-medium text-gray-700"><b>Título</b></label>
              <input
                type="text"
                id="emailTitle"
                name="emailTitle"
                value={contact.emailTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-custom-orange"
                placeholder="Título del correo"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="form-group text-left">
              <label htmlFor="emailDetails" className="block text-lg font-medium text-gray-700"><b>Describe tus preocupaciones</b></label>
              <textarea
                id="emailDetails"
                name="emailDetails"
                value={contact.emailDetails}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-custom-orange"
                rows="4"
                placeholder="Describe tus preocupaciones"
                required
              ></textarea>
            </div>
          </div>
          <div className="text-left">
            <button type="submit"
              className="w-full bg-custom-orange text-white font-bold py-3 px-6 rounded-lg transition duration-300 hover:bg-orange-600">
              Enviar Correo 
            </button>
          </div>
        </form>  
      </div>
    </div>
  );
}

export default Contacto;
