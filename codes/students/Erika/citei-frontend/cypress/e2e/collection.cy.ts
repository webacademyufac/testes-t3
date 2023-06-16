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
      // Utilize a factory de coleção para gerar os dados de uma nova coleção
      const collectionFactory = () => {
        return {
          title: 'Minha Coleção',
          description: 'Camisas',
          imageUrl: 'https://br.images.search.yahoo.com/search/images;_ylt=AwrEpXsnroxk9xQRORvz6Qt.;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZAMEc2VjA3BpdnM-?p=camisas&fr2=piv-web&type=E210BR91199G0&fr=mcafee#id=13&iurl=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FHTB1HovGLVXXXXbYXXXXq6xXFXXXB%2FHombres-camisa-de-manga-larga-cultivan-de-moralidad-camisa-roja-vino-novio-brit-nico-boda-corto.jpg&action=click',
          
        };
      };
      // Utilize o faker para gerar uma url de imagem valida
      const faker = require('faker');
      const imageUrl = faker.image.imageUrl();
      // Acesse a URL da aplicação
      beforeEach(() => {
        cy.visit('/minha-rota');
      });
      // Faça o modal de criar coleção aparecer na tela
      it('Deve abrir o modal de cadastrar coleção', () => {
        cy.get('button.adicionar-colecao').click();
        cy.get('.modal-cadastrar-colecao').should('be.visible');
      });

      cy.get('input[placeholder="Título da coleção"]').type('TROQUE-PELOS-DADOS-DA-FACTORY');
      cy.get('input[placeholder="Outro campo"]').type('VALOR DO OUTRO CAMPO');
      cy.get('input[placeholder="Mais um campo"]').type('VALOR DO MAIS UM CAMPO');
      cy.contains('Salvar').click();

      cy.get('footer').contains('Rodapé').scrollIntoView();
      cy.contains('h3', 'Texto da nova coleção').should('be.visible');
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
