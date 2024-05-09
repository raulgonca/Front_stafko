// Función para cargar colaboradores del proyecto
function loadCollaborators(projectId) {
    fetch(`/api/projects/${projectId}/collaborators`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar colaboradores del proyecto');
        }
        return response.json();
      })
      .then(data => {
        const collaboratorsList = document.getElementById('collaboratorsList');
        collaboratorsList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
        data.forEach(collaborator => {
          const li = document.createElement('li');
          li.textContent = collaborator.name;
          collaboratorsList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Función para cargar detalles del proyecto
  function loadProjectDetails(projectId) {
    fetch(`/api/projects/${projectId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar detalles del proyecto');
        }
        return response.json();
      })
      .then(project => {
        const projectDetailsForm = document.getElementById('projectDetailsForm');
        projectDetailsForm.innerHTML = ''; // Limpiar el formulario antes de agregar nuevos campos
        const projectNameInput = document.createElement('input');
        projectNameInput.type = 'text';
        projectNameInput.value = project.name;
        projectDetailsForm.appendChild(projectNameInput);
  
        const projectDescriptionTextarea = document.createElement('textarea');
        projectDescriptionTextarea.textContent = project.description;
        projectDetailsForm.appendChild(projectDescriptionTextarea);
  
        // Agregar otros campos del proyecto si es necesario
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Función para cargar clientes y horas de Clockify
  function loadClientsAndClockifyHours(projectId) {
    // Cargar clientes del proyecto
    fetch(`/api/projects/${projectId}/clients`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar clientes del proyecto');
        }
        return response.json();
      })
      .then(clients => {
        const clientsList = document.getElementById('clientsList');
        clientsList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
        clients.forEach(client => {
          const li = document.createElement('li');
          li.textContent = client.name;
          clientsList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    // Cargar horas de Clockify
    fetch(`/api/clockify/${projectId}/hours`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar horas de Clockify');
        }
        return response.json();
      })
      .then(hours => {
        const clockifyHours = document.getElementById('clockifyHours');
        clockifyHours.textContent = `${hours} horas`;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Función para abrir el modal y cargar datos del proyecto
  function openProjectModal(projectId) {
    // Limpiar los contenidos previos del modal
    const collaboratorsList = document.getElementById('collaboratorsList');
    const projectDetailsForm = document.getElementById('projectDetailsForm');
    const clientsList = document.getElementById('clientsList');
    const clockifyHours = document.getElementById('clockifyHours');
  
    collaboratorsList.innerHTML = '';
    projectDetailsForm.innerHTML = '';
    clientsList.innerHTML = '';
    clockifyHours.textContent = 'Cargando...';
  
    // Cargar datos en las columnas del modal
    loadCollaborators(projectId);
    loadProjectDetails(projectId);
    loadClientsAndClockifyHours(projectId);
  
    // Mostrar el modal
    const projectModal = document.getElementById('projectModal');
    projectModal.style.display = 'block';
  }
  
  // Evento al hacer clic en un proyecto para abrir el modal
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', function() {
      const projectId = this.dataset.projectId;
      openProjectModal(projectId);
    });
  });
  
  // Inicialización del modal (opcional)
  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = projectModal.querySelector('.close');
  
  closeModalBtn.addEventListener('click', function() {
    projectModal.style.display = 'none';
  });
  