<template>

    <div v-if="visible" id="agregar-modal" class="modal">
        <div class="modal-content">

            <div class="recuado-interior-modal-asignacion">

                <label> Ingrese el nombre de los jugadores:</label>
               
                <form @submit.prevent="registrarJugadores">

                    <div>
                        <label>Jugador1</label>
                        <input type="text" id="datosJugador1" v-model="nombreJugadorA" required>
                    </div>

                    <div>
                        <label>Jugador2</label>
                        <input type="text" id="datosJugador2" v-model="nombreJugadorB" required>
                    </div>

                    <button type="submit">Continuar</button>

                </form>
            </div>

        </div>
    </div>

</template>

<script>
 
    export default {
        name: "ModalComponente",
        props: {
            visible: {
            type: Boolean,
            required: true, 
            },
        },

        data() {
            return {
            nombreJugadorA: "", // Almacena el nombre del jugador 1
            nombreJugadorB: "", // Almacena el nombre del jugador 2
            };
        },


        methods: {
            cerrarModal() {
                //registrarJugadores(this.nombreJugadorA, this.nombreJugadorB)
                this.$emit("close");
            },
        
            registrarJugadores() {
                console.log("Pasando por el ingreso...");

                let nombreA = this.nombreJugadorA;
                let nombreB = this.nombreJugadorB;

                sessionStorage.setItem("JugadorA", nombreA);
                sessionStorage.setItem("JugadorB", nombreB);
                this.$emit("close"); // Con este de aqui se esta llamando a lago que lo controla en la vista en donde se usa el componente.
            },


        },
    };   
        
    



</script>

<style scoped>

    /*Estilos para el fondo semistransparente*/
    .modal {
        /* display: none;  */
        position: fixed; 
        z-index: 2; /* Sobre otros elementos */
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
        border-radius: 10px;
    
    }

    /*>>> Interior del modal de crear asignacion*/
    /* Recuadro blanco del modal*/
    .modal-content {
        background-color: white;
        margin: 15% auto; /* Centrar verticalmente */
        padding: 1%;
        border: 1px solid #888;
        width: 70%; 
        border-radius: 10px;
    }

    .recuado-interior-modal-asignacion {
        background-color: #8A8A8A;
        padding: 1%;
        border-radius: 10px;
    }

</style>