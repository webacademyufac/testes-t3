
// import { soma } from './soma'

const importSoma = require('./soma');

test('Deve retornar 12 quando os os números forem 5 e 7.', () => {
    let soma = {
        x: 5,
        y: 7
    };
    expect(soma(soma)).toBe(12)
})
