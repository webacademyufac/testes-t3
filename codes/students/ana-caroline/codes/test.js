//const { test } = require('node:test')
const Calcularsoma = require('./soma')
//import { soma } from './soma';

test ('Deve retornar 12 quando os numeros forem 5 e 7', () => {
    //Aerofunction
    let soma = {
        a: 5,
        b: 7

    };
    expect(Calcularsoma(soma)).toBe(12)
})

