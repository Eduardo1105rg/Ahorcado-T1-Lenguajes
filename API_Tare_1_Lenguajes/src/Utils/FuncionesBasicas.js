const { LeerDatosJson, EscribirJson, ActulizarJson, ReiniciarRonda, ReinicarPartida } = require('./ManejoJson');
const { GuardarHistorial } = require('../Controllers/HistorialController');


// Funcion para la generacion de numeros de forma aleatoria.
function numeroAlreatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Ordenar de forma aleatoria los jugadores, para saber quien ira primero.
function ordenarJugadores(jugadorA, jugadorB) {
    let numero =  numeroAlreatorio(1, 0);
    //console.log(conjuntoPalabrasActual);
    if (numero === 0) {
         
        return [jugadorA, jugadorB]
    } else {
        return [jugadorB, jugadorA]

    }
}

// Funcion encargada de elegir de forma aleatoria 2 palabras del diccionario de palabras.
async function optenerPalabras() {

        let cantLetras =  numeroAlreatorio(8, 3);

        let numString = cantLetras.toString() + "_letras";

        //console.log(numString);

        let datosJson = await LeerDatosJson("Palabras/ListaPalabras.json");

        let datosListaPalabras = datosJson.palabras;

        //console.log(datosListaPalabras);

        let listaPalabras = datosListaPalabras[numString];

        let valorAleatorio1 = numeroAlreatorio(listaPalabras.length - 1, 0);
        let valorAleatorio2 = numeroAlreatorio(listaPalabras.length -1 , 0);

        let palabra1 = listaPalabras[valorAleatorio1];
        let palabra2 = listaPalabras[valorAleatorio2];

        return [ palabra1, palabra2 ];
    
}

// Funcion encargada de inicar los datos que se registran al inicio de una rando, como los nombre de usuario y la palabra que se les asignara a casa uno.
async function InicarRonda(jugadorA, jugadorB) {

    let jugadores = ordenarJugadores(jugadorA, jugadorB);

    let palabras = await optenerPalabras();

    let ronda = await LeerDatosJson("Ronda/RondaActual.json")

    ronda["Jugador1"]["Nombre"] = jugadores[0];
    ronda["Jugador1"]["Palabra"] = palabras[0];

    ronda["Jugador2"]["Nombre"] = jugadores[1];
    ronda["Jugador2"]["Palabra"] = palabras[1];

    ronda["CantLetras"] = palabras[0].length;

    await EscribirJson("Ronda/RondaActual.json", ronda);

    return ronda["Jugador1"];
    
}

// Inciar los valores de la ronda final, para esta, los jugadores ya no se ordenan de forma aletoria, las palabras si se asignan de forma aleatoria.
async function InicarRondaPostFinalizacion(jugadorA, jugadorB) {

    //let jugadores = ordenarJugadores(jugadorA, jugadorB);
    await reiniciarValoresDeLaRonda();
    let palabras = await optenerPalabras();

    let ronda = await LeerDatosJson("Ronda/RondaActual.json")

    ronda["Jugador1"]["Nombre"] = jugadorA;
    ronda["Jugador1"]["Palabra"] = palabras[0];

    ronda["Jugador2"]["Nombre"] = jugadorB;
    ronda["Jugador2"]["Palabra"] = palabras[1];

    ronda["CantLetras"] = palabras[0].length;

    await EscribirJson("Ronda/RondaActual.json", ronda);

    return ronda["Jugador1"];
    
}


// Funcion encargada de manejar el proceso de recibir una letra y manejar las acciones que se derivan de esto, ademas se encarga de devolver los datos que se enviaran a la interfaz. 
async function ValidacionTurno(letra, tiempo, nombre) {

    try {

        let ronda = await LeerDatosJson("Ronda/RondaActual.json");

        let ordenTurnoJugadores = await  optenerJugadoresPorNombre(nombre)

        let jugadorActual = ronda[ordenTurnoJugadores[0]];
        //console.log(ordenTurnoJugadores);
        let siguienteTurno = ronda[ordenTurnoJugadores[1]];
        let seccionJugador = ordenTurnoJugadores[0];
        let turno = 2;

    
        let nuevaLectura = await LeerDatosJson("Ronda/RondaActual.json");

        nuevaLectura["Turno"] = turno;
        // await ActulizarJson("Ronda/RondaActual.json", "Turno", turno );
        await EscribirJson("Ronda/RondaActual.json", nuevaLectura);
    
        let coincidencias =  validarLetraIngresada(letra, jugadorActual["Palabra"]);
        jugadorActual["Fallo"] = false; // Restablecemos el valor a false.
        
        //console.log("Teclas presionadas: ", tiempo)
        jugadorActual["LetrasPresionadas"] = [...jugadorActual["LetrasPresionadas"], ...letra];
        
        jugadorActual["Tiempo"] = jugadorActual["Tiempo"] + tiempo;

        if (coincidencias.length === 0) {

            jugadorActual["IntentosRestantes"] = jugadorActual["IntentosRestantes"] - 1;
            jugadorActual["Fallo"] = true;
            await ActulizarJson("Ronda/RondaActual.json", seccionJugador, jugadorActual );
    
            await ActulizarJson("Ronda/RondaActual.json", "Turno", turno );
    
            nuevaLectura = await LeerDatosJson("Ronda/RondaActual.json");
            
            let siguienteTurnoValidacion = await optenerSiguienteTurno(seccionJugador) 

            return siguienteTurnoValidacion;//{TurnoActual:nuevaLectura[seccionJugador], SiguienteTurno: siguienteTurno};
        }

        //jugadorActual["LetrasPresionadas"] = jugadorActual["LetrasPresionadas"].push(letra);
        jugadorActual["Letras"][letra] = coincidencias;//{...jugadorActual["Letras"], ...letra:coincidencias};
        await ActulizarJson("Ronda/RondaActual.json", seccionJugador, jugadorActual );
        
        //nuevaLectura = await LeerDatosJson("Ronda/RondaActual.json");

        let datosSiguienteTurno = await optenerSiguienteTurno(seccionJugador); // Llamamos a la funcion encargada de ordenar a los jugadores.

        //nuevaLectura = await LeerDatosJson("Ronda/RondaActual.json");
        return datosSiguienteTurno;//{TurnoActual: nuevaLectura[seccionJugador], SiguienteTurno: siguienteTurno, Ganador: "", DatosGanador: ""};
    
    
    } catch (error) {
        console.error(error);
    }
}


// Funcion encargada de validar si una letra especifica pertenece a una plabra.
function validarLetraIngresada(letra, palabra) {
    let listaPossiciones = [];
    console.log(palabra);
    for (let i = 0; i < palabra.length; i++) {

        //console.log("Letra en validacion: " , palabra[i]);

        if (palabra[i] === letra) {
            listaPossiciones.push(i);
        }
    }
    //console.log("Posisiones encontradas: " + listaPossiciones);
    return listaPossiciones
}

// Funcion encargada de optener que jugador sera el que juegue en el siguiente turno, basado en los intentos que tenga y si ya gano o perdio.
async function optenerSiguienteTurno(jugador) {

    await validarGanadores();

    let nuevaLectura = await LeerDatosJson("Ronda/RondaActual.json");
    let orden = optenerSeccionJugador(jugador);


    let jugadorActual = nuevaLectura[orden[0]];

    let jugadorLibre = nuevaLectura[orden[1]];

    // Validar para el caso de que haya un ganador o un empate.
    if (nuevaLectura["GanadorFinal"] === true || nuevaLectura["Empate"] === true ) {
        return {TurnoActual: jugadorActual, SiguienteTurno: jugadorLibre, Ganador: nuevaLectura["GanadorFinal"], DatosGanador: nuevaLectura["DatosGanadorFinal"], Empate: nuevaLectura["Empate"], Repeticion: false };
    
    } else {
        // Aqui llegaria para lo que seria el flujo normal del juego.    


        // Caso de que ya haya ganado ya un jugador haya ganado,
        if (jugadorLibre["Gano"] === false && jugadorLibre["Perdio"] === false ) {

            // let lecturaParaJugador2 = await LeerDatosJson("Ronda/RondaActual.json");

            // if (lecturaParaJugador2["Jugador2"]["Gano"] === false && lecturaParaJugador2["Jugador2"]["IntentoExtra"] === false && lecturaParaJugador2["Jugador2"]["IntentosRestantes"] != 0) {
            //     return {TurnoActual: jugadorActual, SiguienteTurno: jugadorLibre, Ganador: nuevaLectura["GanadorFinal"], DatosGanador: nuevaLectura["DatosGanadorFinal"], Empate: nuevaLectura["Empate"]};

            // }
            await ActulizarJson("Ronda/RondaActual.json", "Repeticion", false );

            return {TurnoActual: jugadorActual, SiguienteTurno: jugadorLibre, Ganador: nuevaLectura["GanadorFinal"], DatosGanador: nuevaLectura["DatosGanadorFinal"], Empate: nuevaLectura["Empate"], Repeticion: false};

        } else {

            if (jugadorActual["Gano"] === false && jugadorActual["Perdio"] === false) {
                
                await ActulizarJson("Ronda/RondaActual.json", "Repeticion", true );
                
                return  {TurnoActual: jugadorLibre, SiguienteTurno: jugadorActual, Ganador: nuevaLectura["GanadorFinal"], DatosGanador: nuevaLectura["DatosGanadorFinal"], Empate: nuevaLectura["Empate"], Repeticion: true};
            }


        }

    }



}

// Funcion encargada de validar cual es el jugador actual y cual es el del siguiente turno.
function optenerSeccionJugador(jugador) {

    if (jugador === "Jugador1") {
        return ["Jugador1", "Jugador2"];
    } else {
        return ["Jugador2", "Jugador1"]
    }

}

// Funcion encargada de manejar el proceso de validacion de los ganadores de una ronda.
async function validarGanadores() {
    let nuevaLectura = await LeerDatosJson("Ronda/RondaActual.json");

    let jugador1 = nuevaLectura["Jugador1"];

    let jugador2 = nuevaLectura["Jugador2"];

    // Validar para el caso de que logren ganar los dos 
    if (compararLetras(jugador1["Letras"], jugador1["Palabra"]) && compararLetras(jugador2["Letras"], jugador2["Palabra"])) {
        jugador1["Gano"] = true;
        await ActulizarJson("Ronda/RondaActual.json", "Jugador1", jugador1 );

        jugador2["Gano"] = true;
        await ActulizarJson("Ronda/RondaActual.json", "Jugador2", jugador2 );

        // Validar el tiempo de cada jugador 
        if (jugador1["Tiempo"] > jugador2["Tiempo"]) {
            await ActulizarJson("Ronda/RondaActual.json", "GanadorFinal", true );
            await ActulizarJson("Ronda/RondaActual.json", "DatosGanadorFinal", jugador2 );
            return;


        } else if (jugador2["Tiempo"] > jugador1["Tiempo"]) {

            await ActulizarJson("Ronda/RondaActual.json", "GanadorFinal", true );
            await ActulizarJson("Ronda/RondaActual.json", "DatosGanadorFinal", jugador1 );
            return;

        } else {
            // Para el caso de que el tiempo sea el mismo.
            await ActulizarJson("Ronda/RondaActual.json", "Empate", true );
            return;
        }

    }

    // Revisar si el jugador 1 ya completo la palabra.
    if (compararLetras(jugador1["Letras"], jugador1["Palabra"])) {
        jugador1["Gano"] = true;
        await ActulizarJson("Ronda/RondaActual.json", "Jugador1", jugador1 );
        await ActulizarJson("Ronda/RondaActual.json", "GanadorEncontrado", true );
        await ActulizarJson("Ronda/RondaActual.json", "GanadorFinal", true );
        await ActulizarJson("Ronda/RondaActual.json", "DatosGanadorFinal", jugador1 );
        return;



    }

    // Revisar si el jugador 2 ya completo la palabra.
    if (compararLetras(jugador2["Letras"], jugador2["Palabra"])) {//Object.keys(jugador2["Letras"]).length === nuevaLectura["CantLetras"]
        jugador2["Gano"] = true;
        await ActulizarJson("Ronda/RondaActual.json", "Jugador2", jugador2 );
        await ActulizarJson("Ronda/RondaActual.json", "GanadorEncontrado", true );
        await ActulizarJson("Ronda/RondaActual.json", "GanadorFinal", true );
        await ActulizarJson("Ronda/RondaActual.json", "DatosGanadorFinal", jugador2 );
        return;

    }

    // Validar los intentos restantes de los jugadores.
    if (jugador1["IntentosRestantes"] === 0 && jugador2["IntentosRestantes"] === 0) {
        jugador1["Perdio"] = true;
        await ActulizarJson("Ronda/RondaActual.json", "Jugador1", jugador1 );

        jugador2["Perdio"] = true;
        await ActulizarJson("Ronda/RondaActual.json", "Jugador2", jugador2 );
        await ActulizarJson("Ronda/RondaActual.json", "Empate", true );


        return;
    }

    if (jugador1["IntentosRestantes"] === 0) {
        jugador1["Perdio"] = true;
        await ActulizarJson("Ronda/RondaActual.json", "Jugador1", jugador1 );

    }

    if (jugador2["IntentosRestantes"] === 0) {
        jugador2["Perdio"] = true;
        await ActulizarJson("Ronda/RondaActual.json", "Jugador2", jugador2 );

    }

    // Validar si el jugador 1 ya gano
    if (jugador1["Gano"] === true && jugador2["Perdio"] === true) {
        
        await ActulizarJson("Ronda/RondaActual.json", "GanadorFinal", true );
        await ActulizarJson("Ronda/RondaActual.json", "DatosGanadorFinal", jugador1 );
        return;

    }

    // Validar si el jugador 2 ya gano.
    if (jugador2["Gano"] === true && jugador1["Perdio"] === true) {
        
        await ActulizarJson("Ronda/RondaActual.json", "GanadorFinal", true );
        await ActulizarJson("Ronda/RondaActual.json", "DatosGanadorFinal", jugador2 );
        return;

    }
}

// Funcion para verificar si una plabras ya ha sido completada por un jugador
function compararLetras(letras, palabra) {

    let palabraConstruida = Array(palabra.length).fill('_'); // Hacer lo mismo que se hace en la vista del juego.

    for (const [letra, posiciones] of Object.entries(letras)) {

        posiciones.forEach(pos => {
          palabraConstruida[pos] = letra;
        });
    }

    return palabraConstruida.join('') === palabra;

}

// Funcion para optener el orden de los jugadores por su nombre.
async function optenerJugadoresPorNombre(nombreJugador) {
    let nuevaLectura = await LeerDatosJson("Ronda/RondaActual.json");

    let jugador1 = nuevaLectura["Jugador1"];
    //let jugador2 = nuevaLectura["Jugador2"];

    if (jugador1["Nombre"] === nombreJugador) {
        return ["Jugador1", "Jugador2"];
    } else {
        return ["Jugador2", "Jugador1"];
    }
}

// Optiene el orden de los jugadores a partir del nombre de un jugador, para poder acceder a su seccion correspondiente.
async function optenerJugadoresPorNombre2(nombreJugador) {
    let nuevaLectura = await LeerDatosJson("Ronda/Partida.json");

    let jugador1 = nuevaLectura["Jugador1"];
    //let jugador2 = nuevaLectura["Jugador2"];
    if (jugador1["Nombre"] === "") {
        return [];
    }

    if (jugador1["Nombre"] === nombreJugador) {
        return ["Jugador1", "Jugador2"];
    } else {
        return ["Jugador2", "Jugador1"]; // De esta parte, como siempre usaba solo la pos[0], entonces no importaba a quien devolviera en la pos[1].
    }
}


// ========= Para lo que seria el final de la ronda.

// Funcion para llamar a los procesos necesarios al finalizar una ronda, ademas, devuleve los datos que seran impresos en ventana.
async function finalRonda() {

    try {

        let nuevaLectura = await LeerDatosJson("Ronda/RondaActual.json");
        await registrarValoresFinalizacion(nuevaLectura);

        let datosInicio =  await InicarRondaPostFinalizacion(nuevaLectura["Jugador1"]["Nombre"], nuevaLectura["Jugador2"]["Nombre"]);


        let datosJuego = await LeerDatosJson("Ronda/Partida.json");

        // Validamos si ya es el final del juego.

        if (datosJuego["JuegoTerminado"]) {

            await ValidarGanadoresJuego();
            datosJuego = await LeerDatosJson("Ronda/Partida.json");
            await GuardarHistorial()

            return {FinalJuego: datosJuego["JuegoTerminado"], GanadorFinal: datosJuego["GanadorFinal"], EmpateFinal: datosJuego["EmpateFinal"], DatosGanador: datosJuego["DatosGanadorFinal"]};

        } else {
            nuevaLectura = await LeerDatosJson("Ronda/RondaActual.json");

            return {FinalJuego: datosJuego["JuegoTerminado"], DatosJugador: nuevaLectura["Jugador1"] };

        }
        

        
    } catch (error) {
        console.log("Error durante el proceso de finalizado de la ronda: ", error);
        return;
    }
    
}

// Registras los valores y resultados al finalizar cada ronda.
async function registrarValoresFinalizacion(datos) {

    //let ordenJugadores = await optenerJugadoresPorNombre2(datos["Jugador1"]["Nombre"]);

    let datosRonda = await LeerDatosJson("Ronda/RondaActual.json");
    let datosJuego = await LeerDatosJson("Ronda/Partida.json");



    //if (ordenJugadores.length === 0) {
    let jugador1 = datosRonda["Jugador1"];

    datosJuego["Jugador1"]["Nombre"] = jugador1["Nombre"];

    if (datosJuego["UltimaRonda"]) {
        datosJuego["Jugador1"]["GanoActual"] = jugador1["Gano"];
        
    } else {
        datosJuego["Jugador1"]["GanoAnterior"] = jugador1["Gano"];
    }

    datosJuego["Jugador1"]["Tiempo"] =  datosJuego["Jugador1"]["Tiempo"] + jugador1["Tiempo"];


    // Para el jugador 2
    let jugador2 = datosRonda["Jugador2"];

    datosJuego["Jugador2"]["Nombre"] = jugador2["Nombre"];

    if (datosJuego["UltimaRonda"]) {
        datosJuego["Jugador2"]["GanoActual"] = jugador2["Gano"];

    } else {
        datosJuego["Jugador2"]["GanoAnterior"] = jugador2["Gano"];
    }

    datosJuego["Jugador2"]["Tiempo"] = datosJuego["Jugador2"]["Tiempo"] + jugador2["Tiempo"];

    if (datosJuego["UltimaRonda"]) {
        
        if (datosRonda["GanadorFinal"]) {
            datosJuego["RondaFinal"] =  datosRonda["DatosGanadorFinal"]["Nombre"];
        }
    
        if (datosRonda["Empate"]) {
            datosJuego["RondaFinal"] = "Empate";
        }
    
        //if (datosJuego["UltimaRonda"]) {
        datosJuego["JuegoTerminado"] = true;
        await EscribirJson("Ronda/Partida.json", datosJuego);
        return;
        //}
    

    }

    if (datosRonda["GanadorFinal"]) {
        datosJuego["RondaAnterior"] =  datosRonda["DatosGanadorFinal"]["Nombre"];
    }

    if (datosRonda["Empate"]) {
        datosJuego["RondaAnterior"] = "Empate";
    }

    // if (datosJuego["UltimaRonda"]) {
    //     datosJuego["JuegoTerminado"] = true;
    //     await EscribirJson("Ronda/Partida.json", datosJuego);
    //     return;
    // }

    datosJuego["UltimaRonda"] = true;

    await EscribirJson("Ronda/Partida.json", datosJuego);

    return;
}

// Valida los ganadores del juego.
async function ValidarGanadoresJuego() {

    try {
        
        let datosJuego = await LeerDatosJson("Ronda/Partida.json");

        // Si las dos rondas terminaron en empate.
        if (datosJuego["RondaAnterior"] === "Empate" && datosJuego["RondaFinal"] === "Empate") {
            await ActulizarJson("Ronda/Partida.json", "EmpateFinal", true);
            return;

        } else {
            // Para el caso de que haya havido un empate 
            if (datosJuego["RondaAnterior"] === "Empate") { // Esto es para cuando la primera termina en empate, todo se define con los resultados de la segunda.
                let ordenRonda1 = await optenerJugadoresPorNombre2(datosJuego["RondaFinal"]);
                let ganadorRonda1 = datosJuego[ordenRonda1[0]];

                await ActulizarJson("Ronda/Partida.json", "GanadorFinal", true);
                await ActulizarJson("Ronda/Partida.json", "JuegoTerminado", true);
                await ActulizarJson("Ronda/Partida.json", "DatosGanadorFinal", ganadorRonda1);
                return;

            } else if (datosJuego["RondaFinal"] === "Empate") { // Esto es para cuando la segunda termina en empate, todo se define con los resultados de la primera.
                let ordenRonda1 = await optenerJugadoresPorNombre2(datosJuego["RondaAnterior"]);
                let ganadorRonda1 = datosJuego[ordenRonda1[0]];

                await ActulizarJson("Ronda/Partida.json", "GanadorFinal", true);
                await ActulizarJson("Ronda/Partida.json", "JuegoTerminado", true);
                await ActulizarJson("Ronda/Partida.json", "DatosGanadorFinal", ganadorRonda1);
                return;

            } else {

                // Por si hay ganadores.
                if (datosJuego["RondaAnterior"] === datosJuego["RondaFinal"]) { 
                    // El ganador de las dos rondas seria el ganador total.
                    let ordenRonda1 = await optenerJugadoresPorNombre2(datosJuego["RondaAnterior"]);
                    let ganadorRonda1 = datosJuego[ordenRonda1[0]];

                    await ActulizarJson("Ronda/Partida.json", "GanadorFinal", true);
                    await ActulizarJson("Ronda/Partida.json", "JuegoTerminado", true);
                    await ActulizarJson("Ronda/Partida.json", "DatosGanadorFinal", ganadorRonda1);
                    return;
                }

                // Para el caso de que sea un ganador diferente para cada ronda.
                let ordenRonda1 = await optenerJugadoresPorNombre2(datosJuego["RondaAnterior"]);
                let ordenRonda2 = await optenerJugadoresPorNombre2(datosJuego["RondaFinal"]);

                let ganadorRonda1 = datosJuego[ordenRonda1[0]];
                let ganadorRonda2 = datosJuego[ordenRonda2[0]];

                // Si el tiempo total fue igual es un empate.
                if (ganadorRonda1["Tiempo"] === ganadorRonda2["Tiempo"]) {
                    await ActulizarJson("Ronda/Partida.json", "EmpateFinal", true);
                    return;

                } else if (ganadorRonda1["Tiempo"] > ganadorRonda2["Tiempo"]) {
                    // Si el tiempo del ganador de la 1 es mayor al de la 2, entonces gana el de la 2.
                    await ActulizarJson("Ronda/Partida.json", "GanadorFinal", true);
                    await ActulizarJson("Ronda/Partida.json", "JuegoTerminado", true);
                    await ActulizarJson("Ronda/Partida.json", "DatosGanadorFinal", ganadorRonda2);
                    return;
                                   
                } else {
                    // Si no, gana el de la 1 por que su tiempo es menor.
                    await ActulizarJson("Ronda/Partida.json", "GanadorFinal", true);
                    await ActulizarJson("Ronda/Partida.json", "JuegoTerminado", true);
                    await ActulizarJson("Ronda/Partida.json", "DatosGanadorFinal", ganadorRonda1);
                    return;

                }
            }
        }
    } catch (error) {
        console.log("Error al validar los ganadores del juego: ", error);
    }
    
}


// Funcion para la determinacion de una imagen dependiendo de la cantidad de intentos restantes.



// Funcion encargada de reiniciar los valores al final de cada ronda 
async function reiniciarValoresDeLaRonda() {
    await ReiniciarRonda();
}

// Reiniciar los valores registrados del juego.
async function reinicarValoresJuego() {
    await ReinicarPartida();
    return;
}

module.exports = {

    ordenarJugadores,
    numeroAlreatorio,
    InicarRonda,
    ValidacionTurno,
    reiniciarValoresDeLaRonda,
    reinicarValoresJuego,
    finalRonda,
    optenerJugadoresPorNombre2,

};