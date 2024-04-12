//test de cypress para pa pagina del Main (Crear, borrar y eliminar)
import cy from "cypress";


describe('Main Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/main/raul'); // Asegúrate de que la aplicación esté corriendo en esta dirección
  });

  it('debe mostrar los proyectos', () => {
    cy.get('.proyecto').should('have.length.greaterThan', 0); // Verifica que haya proyectos mostrados en la lista
  });

  it('debe mostrar el formulario del proyecto cuando se pulsa el botón "Crear Proyecto".', () => {
    cy.get('.crear-proyecto-btn').click(); // Haz clic en el botón "Crear Proyecto"
    cy.get('input[name="nameproject"]').type('Prueba-testing'); 
    cy.get('textarea[name="description"]').type('esto es una prueba de creacion con el test de cypress');
    cy.get('input[name="fechaInicio"]').type('2024-04-18');
    cy.get('input[name="fechaFinalizacion"]').type('2024-04-19'); 
    cy.get('.modal').should('exist'); // Verifica que se muestre el formulario modal
  });

  it('debe mostrar el formulario de edición del proyecto cuando se pulsa el botón "Editar', () => {
    cy.get('.editar-btn').first().click(); // Haz clic en el botón "Editar" del primer proyecto
    cy.get('textarea[name="description"]').type('esto es una edicion con el test de cypress');
    cy.get('.modal').should('exist'); // Verifica que se muestre el formulario modal
  });

  it('debe eliminar el proyecto cuando se pulsa el botón "Eliminar', () => {
    cy.get('.eliminar-btn').first().click(); // Haz clic en el botón "Eliminar" del primer proyecto
    cy.get('.swal2-popup').should('exist'); // Verifica que se muestre la confirmación de eliminación
    cy.get('.swal2-confirm').click(); // Confirma la eliminación
    cy.get('.swal2-confirm').click(); // Confirma la eliminación
    cy.get('.swal2-popup').should('not.exist'); // Verifica que la ventana emergente de confirmación no exista
  });
});
