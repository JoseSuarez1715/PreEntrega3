

var apuesta = 0;
var azar = 0;
var modoRuleta = "";
var paridad = 0;
var resultadoFinal = 0;
var tipoDeApuesta = "";

// botones de tipo de apuesta
let botonNumero = document.getElementById("botonNumero")
let botonPar = document.getElementById("botonPar")
botonNumero.onclick = () => { modoRulet("numero") }
botonPar.onclick = () => { modoRulet("par") }

// botones de apuestas
let botonCinco = document.getElementById("ruletaCinco")
let botonDiez = document.getElementById("ruletaDiez")
let botonQuince = document.getElementById("ruletaQuince")
let botonVeinte = document.getElementById("ruletaVeinte")

botonCinco.onclick = () => { apuesta = 5 }
botonDiez.onclick = () => { apuesta = 10 }
botonQuince.onclick = () => { apuesta = 15 }
botonVeinte.onclick = () => { apuesta = 20 }

// valor del input y el boton que ejecuta: JUGAR
let eleccion = document.getElementById("numeroRuleta")
let botonJugarRuleta = document.getElementById("ruletaJugar")
// evaluo el dinero actual en la localstorage, si no alcanza a cubrir la apuesta "alert". 
// si alcanza el dinero, evaluo tipo de apuesta 
botonJugarRuleta.onclick = () => { tipoDeApuesta == "numero" ? ruletaNumero(apuesta, eleccion.value) : ruletaColor(apuesta, eleccion.value) }

// al cargar la pagina
document.addEventListener("DOMContentLoaded", () => {
    leer();
});

// funciones

// cambia la leyenda del campo
function modoRulet(modo) {
    tipoDeApuesta = modo;
    modo == "numero" ? document.getElementById("labelEleccionRuleta").innerHTML = `ingresa un numero del 0 al 36` : document.getElementById("labelEleccionRuleta").innerHTML = `ingresa par o impar`
}

// si eliges apostar par o impar
function ruletaColor(valUno, valDos) {
    if (valDos.toLowerCase() != "par" && valDos.toLowerCase() != "impar") {
        alert("ingrese par o impar")
    }
    else {
        var paridad = aleatorioRuleta()
        
        if (paridad == 0) {
            pierdePlata(valUno)
        }
        else {  
            let par = paridad % 2;         
            par == 0 ? paridadResultado = "par" : paridadResultado = "impar";
            paridadResultado == valDos.toLowerCase() ? ganarPlata(valUno) : pierdePlata(valUno)
        }
    }
}

// funcion aleaotria para los 37 numeros de la ruleta, incluyendo el cero
function aleatorioRuleta() {
    azar = Math.floor(Math.random() * 37);
    if (azar == 37) {
        azar = 36;
    }
    document.getElementById("resultadoTirada").innerHTML = `Resultado: salio el ${azar}`
    return azar
}

// comprueba si se ingreso un numero valido
function ruletaNumero(valorUno, valorDos) {
    if (valorDos < 37) {
        ruleta(valorUno, valorDos)
    }
    else {
        alert("ingresó un numero incorrecto")
    }
}

// si eliges apostar por un numero
function ruleta(apu, elec) {
    if (apu == 0) {
        alert("seleccione la apuesta y luego presione JUGAR")
    }
    else {
        resultadoFinal = aleatorioRuleta()
        console.log(resultadoFinal);
        if (resultadoFinal == elec) {
            ganarPlata(parseInt(apu * 35))
        } else {
            pierdePlata(apu)
        }
    }
}

// lee del localstorage y llena los campos de usuario y dinero
function leer() {
    if (localStorage.length == 0) {
        alert("debe loguearse primero")
    }
    else {
        var valoor = JSON.parse(localStorage.getItem("cuentaUno"))
        document.getElementById("userr").innerHTML = `Usuario: ${valoor.user}`
        document.getElementById("dinero").innerHTML = `Dinero: $${valoor.dinero}`
    }
}

// obtiene la propiedad dinero del localstorage, la modifica, guarda un historial... y si el historial llega a 10 borra el mas viejo.
function ganarPlata(plata) {
    let valoor = JSON.parse(localStorage.getItem("cuentaUno"))
    valoor.dinero = valoor.dinero + plata
    document.getElementById("dinero").innerHTML = `Dinero: ${valoor.dinero}`
    localStorage.setItem("cuentaUno", JSON.stringify(valoor))
    document.getElementById("victoriasDerrotas").innerHTML = `<div class="alert alert-success" role="alert">VICTORIA</div>`
    let historico = JSON.parse(localStorage.getItem("historial"))
    if (historico.length > 9) {
        historico.shift()
    }
    historico.push(["ruleta victoria", plata])
    localStorage.setItem("historial", JSON.stringify(historico))
}

// obtiene la propiedad dinero del localstorage, la modifica, guarda un historial... y si el historial llega a 10 borra el mas viejo.
function pierdePlata(plata) {
    let valoor = JSON.parse(localStorage.getItem("cuentaUno"))
    valoor.dinero = valoor.dinero - plata
    document.getElementById("dinero").innerHTML = `Dinero: ${valoor.dinero}`
    localStorage.setItem("cuentaUno", JSON.stringify(valoor))
    document.getElementById("victoriasDerrotas").innerHTML = `<div class="alert alert-danger" role="alert">DERROTA</div>`
    let historico = JSON.parse(localStorage.getItem("historial"))
    if (historico.length > 9) {
        historico.shift()
    }
    historico.push(["ruleta derrota", plata])
    localStorage.setItem("historial", JSON.stringify(historico))
}