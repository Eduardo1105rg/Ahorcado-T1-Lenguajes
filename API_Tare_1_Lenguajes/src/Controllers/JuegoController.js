//const { numeroAlreatorio } = require('./archivoController'); 

const { InicarRonda, ValidacionTurno, reiniciarValoresDeLaRonda, reinicarValoresJuego, finalRonda } = require('../Utils/FuncionesBasicas');

// Funcion que se activa a la hora de que se inicar el juego, recibe los datos de los jugadores y llama a las funciones encargadas de asignarles palabras a cada jugador.
const IniciarJuego = async (req, res) => {
    try { 
        //console.log("Entrando al ordenamiento...")
        const { JugadorA, JugadorB } = req.body;

        await reiniciarValoresDeLaRonda();

        let primerTurno = await InicarRonda( JugadorA, JugadorB);
        //console.log(primerTurno);
        await reinicarValoresJuego();

        res.status(201).json({JugadorActual: primerTurno}); // Para devolver los datos en la consulta. 

    } catch (error) {
        res.status(500).json({ message: 'Error al optener al inicar la ronda', error });
    }
};

// Endpoint para cuando se ingresa una nueva letra, al final devuleve los datos que se usaran para el siguiente turno.
const nuevaLetra = async (req, res) => {
    try { 
        //console.log("Entrando al ordenamiento...")
        const { Letra, Tiempo, Nombre } = req.body;

        let jugadorActual = await ValidacionTurno(Letra, Tiempo, Nombre);
        // let primerTurno = await InicarRonda( JugadorA, JugadorB);
        // console.log(primerTurno);
        
        res.status(201).json(jugadorActual); // Para devolver los datos en la consulta. {JugadorActual: jugadorActual}

    } catch (error) {
        res.status(500).json({ message: 'Error al optener al inicar la ronda', error });
    }
};



// Endpoint para el final de uan ronda, aqui se devolvera los datos de la siguiente ronda o los datos de los ganadores del juego.
const FinalRonda = async (req, res) => {
    try { 

        let datosRonda = await finalRonda();


        res.status(201).json(datosRonda); // Para devolver los datos en la consulta. 

    } catch (error) {
        res.status(500).json({ message: 'Error al optener una palabra', error });
    }
};

module.exports = {
    //OptenerOrdenJUgadores,
    IniciarJuego,
    nuevaLetra,
    FinalRonda,
};