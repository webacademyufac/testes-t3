const calcularArea = require('./soma'); // Assumindo que a função está no arquivo calcularArea.js

test('calcularArea function should correctly calculate the area of a rectangle', () => {
    let soma = {
        x: 5,
        y: 7,
    };
    expect(calcularSoma(soma)).toBe(35);
    
    retangulo = {
        largura: 5,
        altura: "7",
    };
    expect(() => calcularSoma(soma)).toThrow();
});
