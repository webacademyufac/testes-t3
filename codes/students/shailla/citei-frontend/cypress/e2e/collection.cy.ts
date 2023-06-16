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
      // Utilize a factory de coleção para gerar os dados de uma nova coleção
      const novaColecao = collection(); // Usando a factory para gerar dados de uma nova coleção

      const urlImagem = faker.image.url(); 

      // Acesse a URL da aplicação
      cy.visit('http://localhost:8080');

      // Faça o modal de criar coleção aparecer na tela
      // Clique no botão de adicionar coleção
      cy.get('button').contains('Adicionar coleção').click();

      // Preencha os campos do modal com os dados gerados
      cy.get('input[placeholder="Título da coleção"]').type(novaColecao.title);
      cy.get('input[placeholder="URL da imagem"]').type(urlImagem);
      cy.get('textarea[placeholder="Descrição da coleção"]').type(novaColecao.description);

      // Clique no botão de salvar
      cy.get('button').contains('Salvar').click();

      cy.get('footer').contains('Rodapé').scrollIntoView();
  

      // Aqui você deve fazer o assert, o h3 deve estar visível com o texto da nova coleção
      cy.get('h3').contains(novaColecao.title).should('be.visible');
      
    });
  });

  describe('Deve filtrar as coleções corretamente', () => {
    it('Deve exibir a coleção cujo título foi digitado no campo de buscar', async() => {
      cy.visit('http://localhost:8080');

      cy.get('h3').first().then((element) => {
        const firstCollectionTitle = element[0].innerText;

        cy.get('[aria-label="search-icon"]').click();
        cy.get('input[name="search-input"]').type(firstCollectionTitle);

        cy.get('h3').contains(firstCollectionTitle).should('be.visible');
      });
    });
  });
});

export {}
