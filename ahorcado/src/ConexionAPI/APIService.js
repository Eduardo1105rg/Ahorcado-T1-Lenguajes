async function solicitarPalabras() {

    console.log("Pasando por aqui.1...");
	// const formData = new FormData(this);
	// const data = Object.fromEntries(formData.entries()); // Convertir a un objeto JS

    try {

        const respuesta = await fetch('http://localhost:5000/api/archivo/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log("Esperando la respuesta..");
        if (respuesta.ok) {

            const resultado = await respuesta.json();
            console.log("Llego la respeusta.", resultado);
            
            return resultado

        } else {
            console.log("La respuesta no fue la esperada, es erronea..")
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }

}

async function OrdenarJugadores() {

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
            console.log("Llego la respeusta.", resultado);

            sessionStorage.setItem("JugadorA", resultado.jugadorA);
            sessionStorage.setItem("JugadorB", resultado.jugadorB);
            return resultado

        } else {
            console.log("La respuesta no fue la esperada, es erronea..")
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }

}




module.exports = { 
    solicitarPalabras, 
    OrdenarJugadores 
};


