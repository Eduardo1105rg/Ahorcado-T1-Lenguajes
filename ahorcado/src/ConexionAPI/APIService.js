
// funcion para enviar los datos iniciales del juego, es decir los nombre, que se les asigne un orden y las palabras a cada uno.
async function IncializarJuego() {

    console.log("Pasando por aqui.1...");
	// const formData = new FormData(this);
	// const data = Object.fromEntries(formData.entries()); // Convertir a un objeto JS
    let nombreA = sessionStorage.getItem("JugadorA");
    let nombreB = sessionStorage.getItem("JugadorB");
    try {

        const respuesta = await fetch('http://localhost:5000/api/juego/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ JugadorA: nombreA, JugadorB: nombreB })

        });

        console.log("Esperando la respuesta..");
        if (respuesta.ok) {

            const resultado = await respuesta.json();
            console.log("Llego la respuesta.", resultado);

            // sessionStorage.setItem("JugadorA", resultado.jugadorA);
            // sessionStorage.setItem("JugadorB", resultado.jugadorB);
            return resultado.JugadorActual;

        } else {
            console.log("La respuesta no fue la esperada, es erronea..")
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }

}


// Funcion para enviar los datos al ingresar una tecla.
async function EnviarLetra(letra, tiempo, nombre) {

    console.log("Pasando por aqui.1...");

    try {

        const respuesta = await fetch('http://localhost:5000/api/juego/nuevaLetra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Letra: letra, Tiempo: tiempo, Nombre: nombre})

        });

        console.log("Esperando la respuesta..");
        if (respuesta.ok) {

            const resultado = await respuesta.json();
            console.log("Llego la respuesta.", resultado);

            // return resultado.JugadorActual;
            return resultado;
        } else {
            console.log("La respuesta no fue la esperada, es erronea..")
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }

}


// Funcion que solicita el estado del juego al final de cada ronda
async function finalRonda() {

    try {

        const respuesta = await fetch('http://localhost:5000/api/juego/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log("Esperando la respuesta..");
        if (respuesta.ok) {

            const resultado = await respuesta.json();
            console.log("Llego la respeusta del final de ronda: ", resultado);

            return resultado;

        } else {
            console.log("La respuesta no fue la esperada, es erronea..")
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
    
    
    
}

// Funcion para solicitar el historial de partidas jugadas.
async function solicitarHistorial() {
    try {

        const respuesta = await fetch('http://localhost:5000/api/historial/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log("Esperando la respuesta..");
        if (respuesta.ok) {

            const resultado = await respuesta.json();
            console.log("Llego la respuesta con los datos del historial: ", resultado);

            return resultado;

        } else {
            console.log("La respuesta no fue la esperada, es erronea..")
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}



// import axios from 'axios';

// async function IncializarJuego() {
//   const respuesta = await axios.get('/api/palabras');
//   console.log(respuesta.data);
// }



module.exports = { 
     
    IncializarJuego, 
    EnviarLetra,
    finalRonda,
    solicitarHistorial,
};


