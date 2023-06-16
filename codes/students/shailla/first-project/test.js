
// import { soma } from './soma'

const importSoma = require('./soma'); //importação da função soma
//teste com descrição e função anônima
//teste unitário

test('Deve retornar 12 quando os os números forem 5 e 7.', () => {
    let soma = {
        x: 5,
        y: 7
    };
    expect(soma(soma)).toBe(12) //pega a função, soma e faz a requisição esperando algo...
})
