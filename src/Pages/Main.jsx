import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProyectoForm from '../Components/Proyectos/ProyectoForm';
import ProjectList from '../Components/Proyectos/ProjectList';
import Swal from 'sweetalert2';
import Header from '../Container/Header';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/16/solid';

const Main = () => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoEditar, setProyectoEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    getUserProjects();
  }, [username]);

  const getUserProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects?filter[owner][_eq]=${username}`);
      if (response.ok) {
        const data = await response.json();
        setProyectos(data.data); // Ajuste para la estructura de respuesta de Directus
      } else {
        throw new Error('Error al obtener los proyectos: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error al comunicarse con el servidor:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al obtener los proyectos. Por favor, intenta nuevamente más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleCrearProyecto = () => {
    setProyectoEditar(null);
    setMostrarFormulario(true);
  };

  const handleVerDetalles = (proyecto) => {
    setProyectoSeleccionado(proyecto); // Actualiza el estado del proyecto seleccionado
    const modal = document.getElementById('projectDetails');
    if (modal) {
      modal.style.display = 'block';
    }
  };

  const handleCloseModal = () => {
    setProyectoSeleccionado(null); // Reinicia el estado del proyecto seleccionado
    const modal = document.getElementById('projectDetails');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  const handleScrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <><Header /><div className="container mx-auto p-8 mt-2">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Gestiona tus Proyectos</h1>
      <div className="mb-4">
        <button
          onClick={handleCrearProyecto}
          className="bg-custom-rojo text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Nuevo Proyecto
        </button>
      </div>
      <ProjectList proyectos={proyectos} onVerDetalles={handleVerDetalles} />
      {/* Modal de Detalles del Proyecto */}
      {proyectoSeleccionado && (
        <div id="projectDetailsModal" className="modal" style={{ display: 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{proyectoSeleccionado.nameproject}</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{proyectoSeleccionado.description}</p>
                {/* Agrega más detalles del proyecto aquí si es necesario */}
              </div>
            </div>
          </div>
        </div>
      )}
      {mostrarFormulario && (
        <ProyectoForm
          proyectoEditar={proyectoEditar}
          onClose={() => setMostrarFormulario(false)}
          onProjectUpdate={getUserProjects} />
      )}
      {/* Botón para desplazarse al final de la página */}
      <button
        onClick={handleScrollToTop}
        className="fixed top-4 right-4 flex items-center bg-transparent border border-blue-500  py-2 px-4 rounded">
        <ArrowUpIcon className="ml-2 h-5 w-5 transform rotate-180" />
      </button>

      {/* Botón para desplazarse al final de la página */}
      <button
        onClick={handleScrollToBottom}
        className="fixed bottom-4 right-4 flex items-center bg-transparent bg-white  py-2 px-4 rounded mb-7">
        <ArrowDownIcon className="ml-2 h-5 w-5" />
      </button>

    </div></>
  );
};

export default Main;
