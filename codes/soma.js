// export functio...
function soma(variavel){
    if((typeof(variavel.x)=="number") &&
    (typeof(variavel.y)=="number"))
        return (variavel.x + variavel.y)
    else
        return ("Não dá pra somar...")
}

let variavel = {
    x: "95",
    y: 30
}

console.log(soma(variavel))

module.exports = soma

