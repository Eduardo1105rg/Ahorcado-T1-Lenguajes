<template>

    <!--Se abre el modal para el ingreso de los datos de los jugadores-->
    <modal-componente :visible="mostrarModal" @close="cerrarModal">
      <!-- <h2>¡Este es un modal!</h2>
      <p>Aquí puedes añadir cualquier contenido que desees.</p>
      <button @click="cerrarModal">Cerrar</button> -->
    </modal-componente>

    <!-- Contenedor en donde se mostrara todo el contenido del juego. -->
    <div class="contenedor-principal" v-if="usuarioAgregado"> 

      <!-- <h1>Página de Juego</h1>
      <router-link to="/">Inicio</router-link>
    
      <p>{{ nombreA }} --- {{ nombreB }}</p> -->


      <!-- Div contenedor de lo que seria el teclado y donde se muestran las letras.-->
      <div class="contenedor-teclado-palabra-div">
        <div class="datos-jugador-div">

          <label class="turno-label">Torno del jugador: {{ nombreJugador }}</label>
          <label class="intentos-label">Intentos retantes del jugador: {{ intentosRestantes }}</label>
          <label class="intentos-label">Tiempo: </label>

        </div>

        <!-- Div para mostrar los recuadros de donde se ma mostrarndo la palbra. -->
        <div class="palabra-div">

          <span class="letra-div" v-for="(letra, index) in letrasJugadorActual" :key="index" id="">
            <!-- <label>A</label> -->
             {{ letra }}
          </span>

        </div>

        <!-- Div para mostrar el teclado -->
        <div class="teclado-div">

          
          <button class="tecla-btn" @click="presionarTecla('a')" :disabled="letrasJugadas.includes('a')">A</button>
          
          <button class="tecla-btn" @click="presionarTecla('b')" :disabled="letrasJugadas.includes('b')">B</button>

          <button class="tecla-btn" @click="presionarTecla('c')" :disabled="letrasJugadas.includes('c')">C</button>

          <button class="tecla-btn" @click="presionarTecla('d')" :disabled="letrasJugadas.includes('d')">D</button>
          
          <button class="tecla-btn" @click="presionarTecla('e')" :disabled="letrasJugadas.includes('e')">E</button>

          <button class="tecla-btn" @click="presionarTecla('f')" :disabled="letrasJugadas.includes('f')">F</button>
          
          <button class="tecla-btn" @click="presionarTecla('g')" :disabled="letrasJugadas.includes('g')">G</button>
          
          <button class="tecla-btn" @click="presionarTecla('h')" :disabled="letrasJugadas.includes('h')">H</button>
          
          <button class="tecla-btn" @click="presionarTecla('i')" :disabled="letrasJugadas.includes('i')">I</button>
          
          <button class="tecla-btn" @click="presionarTecla('j')" :disabled="letrasJugadas.includes('j')">J</button>
          
          <button class="tecla-btn" @click="presionarTecla('k')" :disabled="letrasJugadas.includes('k')">K</button>
          
          <button class="tecla-div" @click="presionarTecla('l')" :disabled="letrasJugadas.includes('l')">L</button>
          
          <button class="tecla-btn" @click="presionarTecla('m')" :disabled="letrasJugadas.includes('m')">M</button>
          
          <button class="tecla-btn" @click="presionarTecla('n')" :disabled="letrasJugadas.includes('n')">N</button>
          
          <button class="tecla-btn" @click="presionarTecla('ñ')" :disabled="letrasJugadas.includes('ñ')">Ñ</button>
          
          <button class="tecla-btn" @click="presionarTecla('o')" :disabled="letrasJugadas.includes('o')">O</button>
          
          <button class="tecla-btn" @click="presionarTecla('p')" :disabled="letrasJugadas.includes('p')">P</button>
          
          <button class="tecla-btn" @click="presionarTecla('q')" :disabled="letrasJugadas.includes('q')">Q</button>
          
          <button class="tecla-btn" @click="presionarTecla('r')" :disabled="letrasJugadas.includes('r')">R</button>
          
          <button class="tecla-btn" @click="presionarTecla('s')" :disabled="letrasJugadas.includes('s')">S</button>
          
          <button class="tecla-btn" @click="presionarTecla('t')" :disabled="letrasJugadas.includes('t')">T</button>
          
          <button class="tecla-btn" @click="presionarTecla('u')" :disabled="letrasJugadas.includes('u')">U</button>
          
          <button class="tecla-btn" @click="presionarTecla('v')" :disabled="letrasJugadas.includes('v')">V</button>
          
          <button class="tecla-btn" @click="presionarTecla('w')" :disabled="letrasJugadas.includes('w')">W</button>
          
          <button class="tecla-btn" @click="presionarTecla('x')" :disabled="letrasJugadas.includes('x')">X</button>
          
          <button class="tecla-btn" @click="presionarTecla('y')" :disabled="letrasJugadas.includes('y')">Y</button>
          
          <button class="tecla-btn" @click="presionarTecla('z')" :disabled="letrasJugadas.includes('z')">Z</button>
          <!-- <button @click="presionarTecla('')"></button> -->


        </div>

      </div>


      <!-- Div para mostrar la imagen del muñeco -->
      <div class="imagen-div">

        <img class="imagen-ahorcado" :src="rutaImagen" alt="Imagen Ahorcado">
        
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
        nombreJugador: "",
        intentosRestantes: 0,
        letrasJugadorActual: [],
        letrasJugadas: [],
        rutaImagen:"http://elahorcado.com/img/ahorcadoA-04.png",



        
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

        this.nombreJugador = datosJugador["Nombre"];

        this.intentosRestantes = datosJugador["IntentosRestantes"];

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

        let jugadorActual = estaJuego["TurnoActual"];
        console.log("Juga", jugadorActual);

        let siguienteJugador = estaJuego["SiguienteTurno"];


        //this.actualizarPalabra(letrasEncontradas)


        await this.NuevoTurno(siguienteJugador);

      },

      async NuevoTurno(datosJugador) {
        await this.inicializarListaLetras(datosJugador["Palabra"].length);

        this.nombreJugador = datosJugador["Nombre"];

        this.intentosRestantes = datosJugador["IntentosRestantes"];

        let letrasEncontradas = datosJugador["Letras"]

        this.actualizarPalabra(letrasEncontradas);

        this.letrasJugadas = datosJugador["LetrasPresionadas"];

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

  .contenedor-principal {
    background-color: beige;

    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 90vh;
    width:  100vh;

    box-sizing: border-box;
    margin: 5%;
    padding: 3% 2%;


    border-radius: 10px;
  }
  /* ========================== >>>> Seccion de la palabra y el teclado ==================*/

  /* Estilos del contenedor de la palabra y del teclado */
  
  .contenedor-teclado-palabra-div {
    /* background-color: black; */

    /* display: flex;
    justify-content: space-between; */
    align-items: center;
    height: 100%;
    width: 50%;
    box-sizing: border-box;
    margin: 0% 5%;
    /* padding: 5%; */
    border-radius: 10px;
    

  }


  .datos-jugador-div {
    display: grid;
    text-align: center;
  }

  /*=====>>>> Estilos del de la palabra */
  .palabra-div {
    /* background-color: aqua; */
    text-align: center;
    margin: 5%;

  }

  .letra-div {
    display: inline-block;
    background-color: #fac9a2;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid #ef8b3e;
    color: #ef8b3e;
    line-height: 1.5em;

  }
  /*=====>>>> Estilos del teclado */
  .teclado-div {
    /* background-color: aliceblue; */
    align-content: center;
    justify-content: space-between;
  }




  /* ========================== >>>> Seccion de la imagen del muñeco ==================*/

  /* Estilos del contenedor de la imagen */
  .imagen-div {
    /* background-color: rgb(197, 40, 40); */

    box-sizing: border-box;

    padding: 2%;
    width: 50%;

  }

  .imagen-ahorcado {
    max-width: 100%;
    max-height: 50%;
    width: auto;
    height: auto;
  }




</style>