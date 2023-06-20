import { faker } from '@faker-js/faker';
import { collection } from '../../__tests__/factory/collection';

/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe('e2e/collection', () => {
  describe('Deve carregar a página de coleções corretamente', () => {
    it('Deve exibir o botão de adicionar coleção quando ela for carregada', () => {
      cy.visit('http://localhost:8080');

      cy.get('button').contains('Adicionar coleção').should('be.visible');
    });
  });

  describe('Deve exibir corretamente o modal de cadastrar coleção', () => {
    it('Deve exibir a coleção que foi adicionada pelo usuário através do modal de adicionar coleção', () => {
      const newCollection = collection(); // Generate data for a new collection using the collection factory
      const imageUrl = faker.image.imageUrl(); // Generate a valid image URL using faker

      cy.visit('http://localhost:8080');

      cy.get('button').contains('Adicionar coleção').click(); // Open the add collection modal

      cy.get('input[placeholder="Título da coleção"]').type(newCollection.title);
      // Complete the other fields with the data from the newCollection object
      cy.get('input[name="image-url"]').type(imageUrl);

      cy.get('button').contains('Salvar').click(); // Click the save button

      cy.get('footer').contains('Rodapé').scrollIntoView();
      // You may need to use a Cypress method to wait for the screen to finish loading

      cy.get('h3').should('be.visible').contains(newCollection.title); // Assert that the new collection is displayed with the correct title
    });
  });

  describe('Deve filtrar as coleções corretamente', () => {
    it('Deve exibir a coleção cujo título foi digitado no campo de buscar', () => {
      cy.visit('http://localhost:8080');

      cy.get('h3')
        .first()
        .then((element) => {
          const firstCollectionTitle = element[0].innerText;

          cy.get('[aria-label="search-icon"]').click();
          cy.get('input[name="search-input"]').type(firstCollectionTitle);

          cy.get('h3').contains(firstCollectionTitle).should('be.visible');
        });
    });
  });
});

// Prevent TypeScript from reading file as legacy script
export {};