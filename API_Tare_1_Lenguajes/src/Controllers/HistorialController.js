// "Partidad-1": {
//     "Jugador1": "",
//     "Jugador2": "",
//     "Resultado": "",
//     "Ganador": {}
// },

const { LeerDatosJson, ActulizarJson } = require('../Utils/ManejoJson');
//const { optenerJugadoresPorNombre2 } = require('../Utils/FuncionesBasicas');


// Endpoint para la consulta de los datos del historial de partidas.
const ConsultarHistorial = async (req, res) => {
    try { 

        let datosHistorial = await ConsultarRegistros();


        res.status(201).json(datosHistorial); // Para devolver los datos en la consulta. 

    } catch (error) {
        res.status(500).json({ message: 'Error al optener una palabra', error });
    }
};


// Consultar los registros de las partidas.
async function ConsultarRegistros() { 
    let datosHistorial = await LeerDatosJson("Historial/Historial.json");
    //console.log("DatosHistorial: ", datosHistorial);
    return {DatosJuego: datosHistorial["Juegos"]};
}


// Endpoint para guardar los datos de un juego al final de cada juego, estos datos se guardan en un json.
async function GuardarHistorial() {

    try {
        let datosHistorial = await LeerDatosJson("Historial/Historial.json");

        let datosJuego = await LeerDatosJson("Ronda/Partida.json");


        let nuevoRegistro = {
            "Jugador1": datosJuego["Jugador1"]["Nombre"],
            "Jugador2": datosJuego["Jugador2"]["Nombre"],
        };

        if (datosJuego["GanadorFinal"]) {
            nuevoRegistro["Resultado"] = "Gano";
            //nuevoRegistro["Ganador"] = datosJuego["DatosGanador"];

        } else {

            nuevoRegistro["Resultado"] = "Empate";

        }
        nuevoRegistro["Ganador"] = datosJuego["DatosGanadorFinal"];

        let nuevaSeccion = "Partida-" + datosHistorial["CantPartidas"];

        let datos = datosHistorial["Juegos"];

        datos[nuevaSeccion] = nuevoRegistro;

        await ActulizarJson("Historial/Historial.json", "Juegos", datos);


        datosHistorial["CantPartidas"] = datosHistorial["CantPartidas"] + 1;
        await ActulizarJson("Historial/Historial.json", "CantPartidas", datosHistorial["CantPartidas"]);


    } catch (error) {
        console.error("Error al guardar los datos de la partida: ", error);
        return [];
    }
    
}



module.exports = {
    ConsultarHistorial,
    GuardarHistorial,
    GuardarHistorial,

};