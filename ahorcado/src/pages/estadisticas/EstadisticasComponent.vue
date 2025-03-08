<!-- <template>
  <div class="historial-div">
    <h1>Historial de Partidas</h1>
    <router-link to="/">Inicio</router-link>
    <table class="historial-tabla">
      <thead>
        <tr>
          <th>Partida</th>
          <th>Jugador 1</th>
          <th>Jugador 2</th>
          <th>Resultado</th>
          <th>Ganador</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(partida, key) in historial" :key="key">
          <td>{{ key }}</td>
          <td>{{ partida.Jugador1 }}</td>
          <td>{{ partida.Jugador2 }}</td>
          <td>{{ partida.Resultado }}</td>
          <td>{{ partida.Ganador.Nombre || "Sin asignar" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template> -->
<template>
  <div class="historial-div">
    <h1>Historial de Partidas</h1>
    <div v-for="(partida, key) in historial" :key="key" class="partida">
      <h2>{{ key }}</h2>
      <p><strong>Jugador 1:</strong> {{ partida.Jugador1 }}</p>
      <p><strong>Jugador 2:</strong> {{ partida.Jugador2 }}</p>
      <p><strong>Resultado:</strong> {{ partida.Resultado || "Sin resultados" }}</p>
      <p><strong>Datos ganador:</strong> {{ partida.Ganador|| "Sin datos" }}</p>
    </div>
  </div>
</template>
<!-- <script>
import { ref, onMounted } from 'vue';
const { solicitarHistorial } = require('@/ConexionAPI/APIService');

export default {
  setup() {
    let  historial = ref([]);

    const cargarHistorial = async () => {
      try {
        let datos = await solicitarHistorial(); // Llamada asíncrona
        historial.value = datos; // Actualiza el historial con los datos obtenidos
        console.log('Historial cargado:', historial);
      } catch (error) {
        console.error('Error al cargar historial:', error);
      }
    };

    onMounted(() => {
      //console.log('Cargando historial...');
      // Aquí puedes incluir lógica para cargar datos
      //historial.value = ["Partida-1", "Partida-2"];
      cargarHistorial();
    });



    return {
      historial,
    };
  },

  // async cargarHistorial() {
  //   await solicitarHistorial();
  // } 
};
</script> -->


<script>
//import { onMounted } from 'vue';

  const { solicitarHistorial } = require('@/ConexionAPI/APIService')

export default {
  data() {
    return {
      // Diccionario de historial de partidas
      historial: {
        // "Partida-1": {
        //   Jugador1: "Juan",
        //   Jugador2: "Ana",
        //   Resultado: "4-3",
        //   Ganador: { Nombre: "Juan" },
        // },
        // "Partida-2": {
        //   Jugador1: "Carlos",
        //   Jugador2: "Luis",
        //   Resultado: "5-2",
        //   Ganador: { Nombre: "Luis" },
        // },
        // "Partida-3": {
        //   Jugador1: "Sofía",
        //   Jugador2: "Mario",
        //   Resultado: "",
        //   Ganador: {}, // Aún sin ganador
        // },
      },
    };
  },
  // Para que se pueda cargar algo cuando se inicia la ventana.
  mounted() {
      this.cargarHistorial();
      //console.log("Pass..");
  },

  methods: {

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
</style>
