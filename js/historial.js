
function mostratHistorico() {
    let historico = JSON.parse(localStorage.getItem("historial"))
    // document.getElementById("diezUltimos").innerHTML += `<table class="table" background-color="green"> <tr> <td> <h3>Modo de juego y resultado</h3></td> 
    // <td> <h3>Dinero perdido/ganado</h3></td> </tr> </table>`
    for (const iterator of historico) {
        document.getElementById("diezUltimos").innerHTML += `<table class="table"><tr> <td> <h4>${iterator[0]}</h4></td> 
    <td> <h4>${iterator[1]}</h4></td> </tr></table>`
    }
}


// para desloguearse
let botonLogout = document.getElementById("loggoutt")
botonLogout.onclick = () => { localStorage.clear() }

mostratHistorico()