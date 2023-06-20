// function soma(a, b) {
//     return (a + b)
// }

// console.log(soma(a,b));


//Transformando o código acima em objeto
function soma(paramentro){
    if ((typeof(paramentro.a)=="number") && (typeof(paramentro.b)=="number"))
        return (paramentro.a + paramentro.b)
    else
        return ("Não dá pra somar...")
    
}

let paramentro = {
    a: 5,
    b: 7

}

console.log(soma(paramentro))

module.exports = soma