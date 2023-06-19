
// import { soma } from './soma'

const importSoma = require('./soma'); //importa soma utilizando o node

test('Deve retornar 12 quando os os números forem 5 e 7.', () => {
    let soma = { // prepara o obj para o teste
        x: 5,
        y: 7
    };
    expect(soma(soma)).toBe(12)// chama a funcao e verifica se o seu retorno é 12.
})
