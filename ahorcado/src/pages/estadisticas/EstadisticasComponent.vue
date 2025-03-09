<template>
  <div class="historial-div">
    <h1>Historial de Partidas</h1>

    <div>

      <div v-for="(partida, key) in historial" :key="key" class="card">
        <h2>{{ key }}</h2>
        <p><strong>Jugador 1:</strong> {{ partida.Jugador1 }}</p>
        <p><strong>Jugador 2:</strong> {{ partida.Jugador2 }}</p>
        <p><strong>Resultado:</strong> {{ partida.Resultado || "Sin resultados" }}</p>
        <p><strong>Datos ganador:</strong> {{ partida.Ganador|| "Sin datos" }}</p>
      </div>

   </div>

  </div>
</template>

<script>

const { solicitarHistorial } = require('@/ConexionAPI/APIService')

export default {
  data() {
    return {
      // Diccionario de historial de partidas
      historial: {
     
      },
    };
  },
  // Para que se pueda cargar algo cuando se inicia la ventana.
  mounted() {
      this.cargarHistorial();
      //console.log("Pass..");
  },

  methods: {

    // Funcion para llamar a la funcion encargada de optener el historial, ademas asigna el historial optenido a la variables de historial.
    async cargarHistorial() {
      //this.historial = await solicitarHistorial();
      let datosHistorial = await solicitarHistorial();
      this.historial = datosHistorial["DatosJuego"];
    },

  },
};
</script>


<style scoped>
.historial-div {
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
}

.historial-tabla {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.historial-tabla th,
.historial-tabla td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.historial-tabla th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.historial-tabla tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.historial-tabla tbody tr:nth-child(odd) {
  background-color: #fff;
}


.card {
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    background-color: #f5f5f5;
}

</style>
