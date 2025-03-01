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

        
      };
    },
    methods: {
      abrirModal() {
        this.mostrarModal = true;
      },
      cerrarModal() {
        this.mostrarModal = false;
        this.usuarioAgregado = true;
        this.iniciarJuego();
      },
      iniciarJuego() {

        this.nombreA = sessionStorage.getItem("JugadorA");
        this.nombreB = sessionStorage.getItem("JugadorB");
 
      },
    },
  };

</script>

<style scoped>
</style>