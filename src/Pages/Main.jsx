import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProyectoForm from '../Components/Proyectos/ProyectoForm';
import ProjectList from '../Components/Proyectos/ProjectList';
import Swal from 'sweetalert2';

const Main = () => {
  const [ proyectos, setProyectos ] = useState([]);
  const [ proyectoEditar, setProyectoEditar ] = useState(null);
  const [ mostrarFormulario, setMostrarFormulario ] = useState(false);
  const [ proyectoSeleccionado, setProyectoSeleccionado ] = useState(null);
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

//  const handleSearch = async (e) => {
//    e.preventDefault(); // Evitar la recarga de la página por defecto
//    try {
//      const response = await fetch(`${process.env.REACT_APP_API_DIRECTUS}/Projects?filter[nombre][_contains]=${searchQuery}`);
//      if (!response.ok) {
//        throw new Error('Error al buscar proyectos');
//      }
//      const data = await response.json();
//      const proyectosFiltrados = data.data.filter(
//        (proyecto) => !proyectoSeleccionado.includes(proyectos.projectname)
//      );
//      setProyectos(proyectosFiltrados); // Ajuste para la estructura de respuesta de Directus
//      setError(null); // Reiniciamos el error si se recuperan los datos correctamente
//    } catch (error) {
//      console.error('Error al buscar proyectos:', error);
//      setError('Error al buscar proyectos');
//      setProyectos([]); // Aseguramos que proyectos sea un array vacío en caso de error
//    }
//  };

  return (
    <div className="container mx-auto p-8 mt-2">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Gestiona tus Proyectos</h1>
      <div className="mb-4">
        <button
          onClick={handleCrearProyecto}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
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
          onProjectUpdate={getUserProjects}
        />
      )}
    </div>
  );
};

export default Main;
