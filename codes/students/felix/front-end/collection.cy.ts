import { faker } from '@faker-js/faker';
import {collection} from '../../__tests__/factory/collection'

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
      cy.intercept('POST', '/api/collections', (req) => {
        req.reply({ status: 200 });
      }).as('createCollection');
  
      const newCollection = collection();
      const { title, author, subtitle, image } = newCollection;
  
      cy.visit('http://localhost:8080');
  
      cy.get('button').contains('Adicionar coleção').click();
  
      cy.get('input[placeholder="Título da coleção"]').type(title);
  
      cy.get('input[placeholder="URL da imagem"]').type(image.url);
  
      cy.get('button').contains('Salvar').click();
  
      cy.wait('@createCollection');
  
      cy.get('h3').should('be.visible').contains(title);
    });
  });

  describe('Deve filtrar as coleções corretamente', () => {
    it('Deve exibir a coleção cujo título foi digitado no campo de buscar', async() => {
      cy.visit('http://localhost:8080');

      cy.get('h3').first().then((element) => {
        const firstCollectionTitle = element[0].innerText;

        cy.get('[aria-label="search-icon"]').click();
        cy.get('input[name="search-input"').type(firstCollectionTitle);

        cy.get('h3').contains(firstCollectionTitle).should('be.visible');
      });
    });
  });
})

// Prevent TypeScript from reading file as legacy script
export {}
