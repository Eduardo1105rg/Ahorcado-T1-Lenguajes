<template>

    <!--Se abre el modal para el ingreso de los datos de los jugadores-->
    <modal-componente :visible="mostrarModal" @close="cerrarModal">
      <!-- <h2>¡Este es un modal!</h2>
      <p>Aquí puedes añadir cualquier contenido que desees.</p>
      <button @click="cerrarModal">Cerrar</button> -->
    </modal-componente>

    <!-- Contenedor en donde se mostrara todo el contenido del juego. -->
    <div v-if="usuarioAgregado"> 

      <!-- <h1>Página de Juego</h1>
      <router-link to="/">Inicio</router-link>
    
      <p>{{ nombreA }} --- {{ nombreB }}</p> -->

      <!-- Div contenedor de lo que seria el teclado y donde se muestran las letras.-->
      <div class="contenedor-teclado-palabra-div">

        <!-- Div para mostrar los recuadros de donde se ma mostrarndo la palbra. -->
        <div class="palabra-div">

          <span class="letra-div" v-for="(letra, index) in letrasJugadorActual" :key="index" id="">
            <!-- <label>A</label> -->
             {{ letra }}
          </span>

        </div>

        <!-- Div para mostrar el teclado -->
        <div class="teclado-div">

          <button class="tecla-div" @click="presionarTecla('A')">A</button>
          <button class="tecla-div" @click="presionarTecla('B')">B</button>

          <button class="tecla-div" @click="presionarTecla('C')">C</button>

          <button class="tecla-div" @click="presionarTecla('D')">D</button>
          <button class="tecla-div" @click="presionarTecla('E')">E</button>

          <button class="tecla-div" @click="presionarTecla('F')">F</button>
          <button class="tecla-div" @click="presionarTecla('G')">G</button>
          <button class="tecla-div" @click="presionarTecla('H')">H</button>
          <button class="tecla-div" @click="presionarTecla('I')">I</button>
          <button class="tecla-div" @click="presionarTecla('J')">J</button>
          <button class="tecla-div" @click="presionarTecla('K')">K</button>
          <button class="tecla-div" @click="presionarTecla('L')">L</button>
          <button class="tecla-div" @click="presionarTecla('M')">M</button>
          <button class="tecla-div" @click="presionarTecla('N')">N</button>
          <button class="tecla-div" @click="presionarTecla('Ñ')">Ñ</button>
          <button class="tecla-div" @click="presionarTecla('O')">O</button>
          <button class="tecla-div" @click="presionarTecla('P')">P</button>
          <button class="tecla-div" @click="presionarTecla('Q')">Q</button>
          <button class="tecla-div" @click="presionarTecla('R')">R</button>
          <button class="tecla-div" @click="presionarTecla('S')">S</button>
          <button class="tecla-div" @click="presionarTecla('T')">T</button>
          <button class="tecla-div" @click="presionarTecla('U')">U</button>
          <button class="tecla-div" @click="presionarTecla('V')">V</button>
          <button class="tecla-div" @click="presionarTecla('W')">W</button>
          <button class="tecla-div" @click="presionarTecla('X')">X</button>
          <button class="tecla-div" @click="presionarTecla('Y')">Y</button>
          <button class="tecla-div" @click="presionarTecla('Z')">Z</button>
          <!-- <button @click="presionarTecla('')"></button> -->




          <!-- <div class="tecla-div">
            <button @click="presionarTecla('A')">A</button>
          </div>

          <div class="tecla-div">
            <label>B</label>
          </div>

          <div class="tecla-div">
            <label>C</label>
          </div>

          <div class="tecla-div">
            <label>D</label>
          </div>

          <div class="tecla-div">
            <label>F</label>
          </div>

          <div class="tecla-div">
            <label>G</label>
          </div>

          <div class="tecla-div">
            <label>H</label>
          </div>
          
          <div class="tecla-div">
            <label>I</label>
          </div>

          <div class="tecla-div" >
            <label>J</label>
          </div>  

          <div class="tecla-div">
            <label>K</label>
          </div>

          <div class="tecla-div">
            <label>L</label>
          </div>

          <div class="tecla-div">
            <label>M</label>
          </div>

          <div class="tecla-div">
            <label>N</label>
          </div>

          <div class="tecla-div">
            <label>O</label>
          </div>

          <div class="tecla-div">
            <label>P</label>
          </div>

          <div class="tecla-div">
            <label>Q</label>
          </div>

          <div class="tecla-div">
            <label>R</label>
          </div>

          <div class="tecla-div">
            <label>S</label>
          </div>

          <div class="tecla-div">
            <label>T</label>
          </div>

          <div class="tecla-div">
            <label>U</label>
          </div>

          <div class="tecla-div">
            <label>V</label>
          </div>

          <div class="tecla-div">
            <label>X</label>
          </div>

          <div class="tecla-div">
            <label>Y</label>
          </div>

          <div class="tecla-div">
            <label>Z</label>
          </div> -->

        </div>

      </div>


      <!-- Div para mostrar la imagen del muñeco -->
      <div class="imagen-div">


      </div>





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
        letrasJugadorActual: [],

        
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
        this.inicializarListaLetras(palabras.palabra1.length);
        // this.cantLetras = palabras.palabra1;
        // console.log(palabras);

        await this.asignarJugadores();
        //palabras = await solicitarPalabras();
      }, 

      async inicializarListaLetras(largo) {
        this.letrasJugadorActual = Array(largo).fill("_");
      },

      // actualizarLetras(letra, indice) {
      //   this.$set(this.letras, indice, letra);
      // },
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
      async presionarTecla(letra) {
        console.log("Tecla presionada...", letra);
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

  /* ========================== >>>> Seccion de la palabra y el teclado ==================*/

  /* Estilos del contenedor de la palabra y del teclado */
  .contenedor-teclado-palabra-div {
    background-color: beige;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 90vh;
    box-sizing: border-box;
    margin: 5%;

    border-radius: 10px;
    

  }



  /*=====>>>> Estilos del de la palabra */
  .palabra-div {
    background-color: aqua;
  }

  .letra-div {
    display: inline-block;
    background-color: #fac9a2;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid #ef8b3e;
    color: #ef8b3e;
    line-height: 1.5em;
    align-items: center;
  }
  /*=====>>>> Estilos del teclado */
  .teclado-div {
    background-color: aliceblue;
  }




  /* ========================== >>>> Seccion de la imagen del muñeco ==================*/

  /* Estilos del contenedor de la imagen */
  .imagen-div {
    background-color: aquamarine;
  }




</style>