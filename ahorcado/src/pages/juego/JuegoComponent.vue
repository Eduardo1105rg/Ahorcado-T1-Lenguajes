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

          <button class="tecla-div" @click="presionarTecla('a')">A</button>
          <button class="tecla-div" @click="presionarTecla('b')">B</button>

          <button class="tecla-div" @click="presionarTecla('c')">C</button>

          <button class="tecla-div" @click="presionarTecla('d')">D</button>
          <button class="tecla-div" @click="presionarTecla('e')">E</button>

          <button class="tecla-div" @click="presionarTecla('f')">F</button>
          <button class="tecla-div" @click="presionarTecla('g')">G</button>
          <button class="tecla-div" @click="presionarTecla('h')">H</button>
          <button class="tecla-div" @click="presionarTecla('i')">I</button>
          <button class="tecla-div" @click="presionarTecla('j')">J</button>
          <button class="tecla-div" @click="presionarTecla('k')">K</button>
          <button class="tecla-div" @click="presionarTecla('l')">L</button>
          <button class="tecla-div" @click="presionarTecla('m')">M</button>
          <button class="tecla-div" @click="presionarTecla('n')">N</button>
          <button class="tecla-div" @click="presionarTecla('ñ')">Ñ</button>
          <button class="tecla-div" @click="presionarTecla('o')">O</button>
          <button class="tecla-div" @click="presionarTecla('p')">P</button>
          <button class="tecla-div" @click="presionarTecla('q')">Q</button>
          <button class="tecla-div" @click="presionarTecla('r')">R</button>
          <button class="tecla-div" @click="presionarTecla('s')">S</button>
          <button class="tecla-div" @click="presionarTecla('t')">T</button>
          <button class="tecla-div" @click="presionarTecla('u')">U</button>
          <button class="tecla-div" @click="presionarTecla('v')">V</button>
          <button class="tecla-div" @click="presionarTecla('w')">W</button>
          <button class="tecla-div" @click="presionarTecla('x')">X</button>
          <button class="tecla-div" @click="presionarTecla('y')">Y</button>
          <button class="tecla-div" @click="presionarTecla('z')">Z</button>
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

  const { IncializarJuego, EnviarLetra } = require('@/ConexionAPI/APIService')

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

        let datosJugador = await IncializarJuego();
        this.inicializarListaLetras(datosJugador.Palabra.length);
        // this.cantLetras = palabras.palabra1;
        // console.log(palabras);

        //await this.asignarJugadores();
        //palabras = await solicitarPalabras();
      }, 

      async inicializarListaLetras(largo) {
        this.letrasJugadorActual = Array(largo).fill("_");
      },

      // Funcion encargada de reaccionar a cuando se presiona una tecla en el teclado virtual
      async presionarTecla(letra) {
        console.log("Tecla presionada...", letra);

        let estaJuego = await EnviarLetra(letra);
        console.log("Los datos del nuevo turno: ", estaJuego );

        //let jugadorActual = estaJuego[TurnoActual];

        let siguienteJugador = estaJuego["SiguienteTurno"];

        //this.actualizarPalabra(letrasEncontradas)


        await this.NuevoTurno(siguienteJugador);

      },

      async NuevoTurno(datosJugador) {
        await this.inicializarListaLetras(datosJugador["Palabra"].length);

        let letrasEncontradas = datosJugador["Letras"]

        this.actualizarPalabra(letrasEncontradas);
        // for (let letra in letrasEncontradas ) {
        //   console.log("Letra a ubicar: ", letra);
        //   for (let pos of letrasEncontradas[letra]) {
        //     console.log("Pos a usar: ", pos);
        //     this.actualizarLetras(letra.toUpperCase(), pos);
        //   }
        // }
        
      },

      actualizarPalabra(letras) {
        for (let letra in letras ) {
          console.log("Letra a ubicar: ", letra);
          for (let pos of letras[letra]) {
            console.log("Pos a usar: ", pos);
            this.actualizarLetras(letra.toUpperCase(), pos);
          }
        }
      }, 

      actualizarLetras(letra, indice) {
        this.letrasJugadorActual[indice] = letra;
        //this.$set(, indice, letra);
      },






    },
  };




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
    align-items: center;
  }




  /* ========================== >>>> Seccion de la imagen del muñeco ==================*/

  /* Estilos del contenedor de la imagen */
  .imagen-div {
    background-color: aquamarine;
    height: 20%;

  }




</style>