const fs = require('fs').promises;
const { json } = require('stream/consumers');

let conjuntoPalabrasActual = [];

const OptenerPalabra = async (req, res) => {
    try { 
        //console.log(conjuntoPalabrasActual);
    
        let cantLetras =  numeroAlreatorio(8, 3);

        let numString = cantLetras.toString() + "_letras";

        //console.log(numString);

        let datosJson = await leerDatosJson();

        let datosListaPalabras = datosJson.palabras;

        //console.log(datosListaPalabras);

        let listaPalabras = datosListaPalabras[numString];

        let valorAleatorio1 = numeroAlreatorio(listaPalabras.length - 1, 0);
        let valorAleatorio2 = numeroAlreatorio(listaPalabras.length -1 , 0);

        let palabra1 = listaPalabras[valorAleatorio1];
        let palabra2 = listaPalabras[valorAleatorio2];

        conjuntoPalabrasActual = [ palabra1, palabra2 ];
        //console.log(conjuntoPalabrasActual);




        //const { AsignacionId, UsuarioId, Datos } = req.body;

        //console.log("Hola");

        res.status(201).json({ palabra1: palabra1, palabra2: palabra2 }); // Para devolver los datos en la consulta. 

    } catch (error) {
        res.status(500).json({ message: 'Error al optener una palabra', error });
    }
};

async function leerDatosJson() {
    try {
        const data = await fs.readFile('src/palabras/listaPalabras.json', 'utf-8');
        const datos = JSON.parse(data);
        return datos;
    } catch (error) {
        console.log("Error al leer o manipular el JSON:", error);
        return; 
    }
}


function numeroAlreatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


module.exports = { OptenerPalabra, numeroAlreatorio, conjuntoPalabrasActual }; 