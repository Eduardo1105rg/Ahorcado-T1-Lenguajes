const fs = require('fs').promises;
const { json } = require('stream/consumers');

//const RutaBase = "C:/Users/edurg/OneDrive/Escritorio/Registros/";
const RutaBase = "src/Registros/";
// Funcion basica para la apertura de un archivo json y la lectura de sus datos.
async function LeerDatosJson(archivo) {
    try {
        //src/palabras/listaPalabras.json
        let ruta = RutaBase + archivo;
        let data = await fs.readFile(ruta, 'utf-8');
        let datos = JSON.parse(data);
        return datos;

    } catch (error) {
        console.log("Error al leer o manipular el JSON:", error);
        return; 
    }
}


// Funcion basica para la escritira en un archivo json.
async function EscribirJson(archivo, datos) {

    try {

        let ruta = RutaBase + archivo;

        let datosJson = JSON.stringify(datos, null, 2);

        await fs.writeFile(ruta, datosJson, 'utf-8');

        console.log("Json escrito corretamente.");

    } catch (error) {

        console.error('Error al escribir en el archivo', error);

    }
}

// Actualizar los datos de una seccion especifica de un Json..
async function ActulizarJson( archivo, seccion, datos) {

    try {

        let ruta = RutaBase + archivo;

        let datosRegistrados = await LeerDatosJson(archivo);

        datosRegistrados[seccion] = datos;

        let datosJson = JSON.stringify(datosRegistrados, null, 2);

        //console.log("Data modi: " , datosJson)

        await fs.writeFile(ruta, datosJson, 'utf-8');

        console.log("Json actualizado corretamente.");

    } catch (error) {

        console.error('Error al escribir en el archivo', error);

    }
}

// Funcion para el reinicio de los valores al final de una ronda, sobreescribe el archivo de rondas.
async function ReiniciarRonda() {
    
    const datos = {
        "Jugador1": {
          "Nombre": "",
          "Palabra": "",
          "IntentosRestantes": 6,
          "Letras": {},
          "RutaImagen": "",
          "Fallo": false,
          "Tiempo": 0,
          "LetrasPresionadas": [],
          "Gano": false,
          "Perdio": false

        },
        "Jugador2": {
          "Nombre": "",
          "Palabra": "",
          "IntentosRestantes": 6,
          "Letras": {},
          "RutaImagen": "",
          "Fallo": false,
          "Tiempo": 0,
          "LetrasPresionadas": [],
          "Gano": false,
          "IntentoExtra": false,
          "Perdio": false
      
        },
        "Turno": 1,
        "CantLetras": 0,
        "GanadorFinal": false,
        "GanadorEncontrado": false,
        "DatosGanadorFinal": {},
        "Empate": false,
        "Repeticion": false
      }

    await EscribirJson("Ronda/RondaActual.json", datos);

    //console.log("Datos de la ronda reiniciados");
    return;

}

// Reinicar los datos de una partidad.
async function ReinicarPartida(params) {
    const datos = {
        "Jugador1": {
            "GanoAnterior": false,
            "GanoActual": false,
            "Tiempo": 0
        },
        "Jugador2": {
            "GanoAnterior": false,
            "GanoActual": false,
            "Nombre": false,
            "Tiempo": 0
        },
        "GanadorFinal": false,
        "DatosGanadorFinal": {},
        "RondaAnterior": "",
        "RondaFinal": "",
        "EmpateFinal": false,
        "UltimaRonda": false,
        "JuegoTerminado": false

    };

    await EscribirJson("Ronda/Partida.json", datos);


    return;
}

module.exports = {
    LeerDatosJson,
    EscribirJson,
    ActulizarJson,
    ReiniciarRonda,
    ReinicarPartida,

};