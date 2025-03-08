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

          <label class="turno-label">Turno del jugador: {{ nombreJugador }}</label>
          <label class="intentos-label">Intentos retantes del jugador: {{ intentosRestantes }}</label>
          <label class="intentos-label">Tiempo transcurrido en este turno: {{ tiempoTurno }} segundos.</label>

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

  const { IncializarJuego, EnviarLetra, finalRonda } = require('@/ConexionAPI/APIService')

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
        rutaImagen: "",//http://elahorcado.com/img/ahorcadoA-04.png | 
        tiempoTurno: 0,
        temporizador: null,
        desactivarTeclado: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], 




        
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
        this.rutaImagen = this.seleccionImagen(datosJugador["IntentosRestantes"]);

        this.tiempoTurno = 0

        this.temporizador = setInterval(() => {
          this.tiempoTurno++;
          //console.log("Tiempo ++");
        }, 1000);
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

        clearInterval(this.temporizador);
        //console.log("Tecla presionada...", letra);

        let estaJuego = await EnviarLetra(letra, this.tiempoTurno, this.nombreJugador);

        console.log("Los datos del nuevo turno: ", estaJuego );

        let jugadorActual = estaJuego["TurnoActual"];

        let siguienteJugador = estaJuego["SiguienteTurno"];

        //console.log("Juga", jugadorActual);

        if (estaJuego["Repeticion"]) {
          await this.actulizarDatos(siguienteJugador);

        } else {
          await this.actulizarDatos(jugadorActual);
        }

        this.letrasJugadas = this.desactivarTeclado;


        // Validar se la ronda llego a su final
        if (estaJuego["Ganador"] || estaJuego["Empate"]) {

          if (estaJuego["Ganador"] ) {
            this.$swal({
              title: 'Ganador!',
              text: `Felicidades al jugador ${estaJuego["DatosGanador"]["Nombre"]} por ganar la ronda, con un tiempo de ${estaJuego["DatosGanador"]["Tiempo"]} segundos.`, //``
              icon: 'success',
              timer: 3000, // Tiempo en milisegundos antes de que desaparezca la alerta
              showConfirmButton: false, // Oculta el botón de confirmación
            });
          } else {

            this.$swal({
              title: 'Empate',
              text: 'La ronda finalizo en empate.',
              icon: 'info',
              timer: 3000, // Tiempo en milisegundos antes de que desaparezca la alerta
              showConfirmButton: false, // Oculta el botón de confirmación
            });

          }
          setTimeout(() => {

          // Aqui hacemos el prodimiento para ir a la siguiente ronda 


          }, 5000);

          let nuevoRonda = await finalRonda();
          
          // Para cuando se llega al final del juego.
          if (nuevoRonda["FinalJuego"]) {

            this.reinicarValores();
            setTimeout(() => {
            if (nuevoRonda["GanadorFinal"]) {
              this.$swal({
                title: 'Ganador!',
                text: `Felicidades al jugador ${nuevoRonda["DatosGanador"]["Nombre"]} por ganar la partida.`,
                icon: 'success',
                timer: 3000, // Tiempo en milisegundos antes de que desaparezca la alerta
                showConfirmButton: false, // Oculta el botón de confirmación
              });


            } else {

              this.$swal({
                title: 'Empate',
                text: 'El juego finalizo en empate.',
                icon: 'info',
                timer: 3000, // Tiempo en milisegundos antes de que desaparezca la alerta
                showConfirmButton: false, // Oculta el botón de confirmación
              });
            }
            
            }, 3000);
              // Aqui hacemos el prodimiento para ir a la siguiente ronda 
            this.usuarioAgregado = false;
            this.mostrarModal = true;
            return;

          }

          await this.actulizarDatos(nuevoRonda["DatosJugador"]);
          this.tiempoTurno = 0

          this.temporizador = setInterval(() => {
            this.tiempoTurno++;
          }, 1000);
          
          return;
        }

        if (jugadorActual["Fallo"]) {
          this.$swal({
            title: 'Letra erronea.',
            text: 'La letra ingresada no corresponde a la palabra asignada.',
            icon: 'error',
            timer: 3000, // Tiempo en milisegundos antes de que desaparezca la alerta
            showConfirmButton: false, // Oculta el botón de confirmación
          });

        } else {
          this.$swal({
            title: 'Letra correcta.',
            text: 'La letra ingresada pertenece a la palabra.',
            icon: 'success',
            timer: 2000, // Tiempo en milisegundos antes de que desaparezca la alerta
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        }
        setTimeout(() => {
          
          this.nuevoTurno(siguienteJugador);

        }, 4000);
        
      },

      async nuevoTurno(datosJugador) {

        await this.actulizarDatos(datosJugador);

        this.tiempoTurno = 0

        this.temporizador = setInterval(() => {
          this.tiempoTurno++;
        }, 1000);

      },


      async actulizarDatos(datosJugador) {

        await this.inicializarListaLetras(datosJugador["Palabra"].length);

        this.nombreJugador = datosJugador["Nombre"];

        this.intentosRestantes = datosJugador["IntentosRestantes"];

        let letrasEncontradas = datosJugador["Letras"];

        this.actualizarPalabra(letrasEncontradas);

        this.letrasJugadas = datosJugador["LetrasPresionadas"];

        this.rutaImagen = this.seleccionImagen(datosJugador["IntentosRestantes"]);
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
          //console.log("Letra a ubicar: ", letra);
          for (let pos of letras[letra]) {
            //console.log("Pos a usar: ", pos);
            this.actualizarLetras(letra.toUpperCase(), pos);
          }
        }
      }, 

      actualizarLetras(letra, indice) {
        this.letrasJugadorActual[indice] = letra;
        //this.$set(, indice, letra);
      },

      reinicarValores() {

        this.usuarioAgregado = false;
        this.nombreJugador = "";
        this.intentosRestantes = 0;
        this.letrasJugadorActual = [];
        this.letrasJugadas = [];
        this.rutaImagen ="http://elahorcado.com/img/ahorcadoA-04.png",
        this.tiempoTurno = 0;
        this.temporizador = null;
      },

      seleccionImagen(intentos) {
        console.log("Intentos:  ", intentos);
        switch (intentos) {
          case 5:
              return require('@/assets/5-IMG.jpg');
          case 4:
              return require('@/assets/4-IMG.jpg');

          case 3:
              return require('@/assets/3-IMG.jpg');

          case 2:
              return require('@/assets/2-IMG.jpg');

          case 1:
              return  require('@/assets/1-IMG.jpg');

          case 0:
              return require('@/assets/0-IMG.jpg');

              
          default:
              return require('@/assets/6-IMG.jpg');
        }
      }
    }
}      









</script>

<style scoped>

  .contenedor-principal {
    background-color: beige;

    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 90vh;
    width:  90%;

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

  .tecla-btn {
    color: black;
  }


  /* ========================== >>>> Seccion de la imagen del muñeco ==================*/

  /* Estilos del contenedor de la imagen */
  .imagen-div {
    /* background-color: rgb(197, 40, 40); */

    box-sizing: border-box;
    align-items: center;

    /* padding: 2%; */
    width: 50%;

  }

  .imagen-ahorcado {
    /* max-width: 100%;
    max-height: 100%; */
    width: 50%;
    height: auto;
    border-radius: 10px;
  }




</style>