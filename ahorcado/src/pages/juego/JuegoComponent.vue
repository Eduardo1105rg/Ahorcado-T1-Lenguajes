<template>

    <!--Se abre el modal para el ingreso de los datos de los jugadores-->
    <modal-componente :visible="mostrarModal" @close="cerrarModal">
      <!-- <h2>¡Este es un modal!</h2>
      <p>Aquí puedes añadir cualquier contenido que desees.</p>
      <button @click="cerrarModal">Cerrar</button> -->
    </modal-componente>


    <div v-if="usuarioAgregado">
      <h1>Página de Juego</h1>
      <router-link to="/">Inicio</router-link>
    
      <p>{{ nombreA }} --- {{ nombreB }}</p>
    </div>


</template>

<script>

  import ModalComponente from "@/components/UsuariosModalComponent.vue";

  const { solicitarPalabras, OrdenarJugadores } = require('@/ConexionAPI/APIService')

  export default {
    name: "JuegoVista",
    components: {
      ModalComponente,
    },
    data() {
      return {
        mostrarModal: true, // Controla la visibilidad del modal
        usuarioAgregado: false,
        nombreA: "",
        nombreB: "",
        largoPalabra: 0,
        turnoActual: true,

        
      };
    },
    methods: {
      abrirModal() {
        this.mostrarModal = true;
      },

      // Funcion encargada de cerrar el modal para el ingreso de los nombres de los jugadores.
      async cerrarModal() {
        this.mostrarModal = false;
        this.usuarioAgregado = true;
        await this.iniciarJuego();
      },

      // Funcion encargada de inciar el proceso de juego.
      async iniciarJuego() {

        let palabras = await solicitarPalabras();
        console.log(palabras);

        await this.asignarJugadores();

      }, 

      // Funcion encargada de asignar el jugador que ira primero en las rondas
      async asignarJugadores() {
        let ordenamiento = await OrdenarJugadores();
        console.log(ordenamiento);

        // this.nombreA = ordenamiento[0];
        // this.nombreB = ordenamiento[1];

        //let numero = numeroAlreatorio(1,0);
        this.nombreA = sessionStorage.getItem("JugadorA");
        this.nombreB = sessionStorage.getItem("JugadorB");

        // if (numero === 0) {
        //   // return [nombreA, nombreB];
        //   this.nombreA = sessionStorage.getItem("JugadorA");
        //   this.nombreB = sessionStorage.getItem("JugadorB");
          
        // } else {
        //   this.nombreA = sessionStorage.getItem("JugadorB");
        //   this.nombreB = sessionStorage.getItem("JugadorA");
        // }
        
      },



    },
  };

  // async function EsperarOrdenamiento(){
  //   let ordenamiento = await OrdenarJugadores();
  //       console.log(ordenamiento);
  //       //let numero = numeroAlreatorio(1,0);
  //   return [sessionStorage.getItem("JugadorA"), sessionStorage.getItem("JugadorB")]
        
  // }

  // Funcion para optener un numero de forma aleatoria.
  // function numeroAlreatorio(max, min) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min
  // }


</script>

<style scoped>
</style>