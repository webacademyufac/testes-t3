// export functio...
function soma(variavel){ // funcão soma
    if((typeof(variavel.x)=="number") &&
    (typeof(variavel.y)=="number"))
        return (variavel.x + variavel.y)
    else
        return ("Não dá pra somar...")
}

let variavel = { // objeto variável
    x: "95",
    y: 30
}

console.log(soma(variavel)) //mostra soma no console

module.exports = soma //exporta funcao para outras classes

