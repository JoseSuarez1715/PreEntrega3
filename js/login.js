class jugador {
    constructor(nombre, apellido, user, dinero) {
        this.nombre = nombre
        this.apellido = apellido
        this.user = user
        this.dinero = dinero
    }
}

const jugadorUno = new jugador("jose", "suarez", "ark", 20)

let botonLogin = document.getElementById("loguear")
botonLogin.onclick = () => { ingresarDatos() }

function ingresarDatos() {
    let nombre = document.getElementById("nombreLogin")
    let apellido = document.getElementById("apellidoLogin")
    let user = document.getElementById("userLogin")
    let monto = document.getElementById("dineroLogin")
    jugadorUno.nombre = nombre.value,
        jugadorUno.apellido = apellido.value,
        jugadorUno.user = user.value
    jugadorUno.dinero = monto.value

    guardarLogin();
    redirigir();
}

const arrayHistorial = []

function guardarLogin() {
    localStorage.setItem("cuentaUno", JSON.stringify(jugadorUno))
    localStorage.setItem("historial", JSON.stringify(arrayHistorial))
}

function redirigir() {
    alert(`Ya puede ingresar a los juegos ${jugadorUno.nombre}, suerte!`)
}