<template>

    <div class="contenedorPrincipal"> <!--Div principal que contendra todas las demas secciones-->
        <section> <!--Seccion de la parte superior de la pagina-->
            <div>
                <h1>Juego de ahorcado</h1>
            </div>
        </section>
        
        <div class="contenedorInferior">
            <div class="contenedorIzquierdo"> <!--Informacion-->
                <h2>Historial de resultados</h2>

                <div>
                    <p>Presiona el boton de abajo para ir a revisar el historial de las partidas jugadas.</p>
                </div>
                <router-link to="/estadisticas">Historial</router-link>
                <form action="/verHistorial" method="post">
                    <button type="submit">Ver historial</button>
                </form>


                
            </div>

            <div class="contenedorDerecho"> <!--Juego| Todo lo referente a la configuracion y la redireccion-->
                
                <div> <!--Informacion general del juego-->
                    <h2>Aspectos importantes</h2>
                    <ul>
                        <li> En el juego de ahorcado se tendran dos jugadores compiendo por turnos, cada jugador devera de seleccionar una letra, con la que crean que se completara la palabra dada.
                        </li>


                    </ul>
                  
                </div>
            
                <router-link to="/juego">Juego</router-link>
                <form action="/ventanaJuego" method="get">
                    <button type="submit">Jugar</button>
                </form>
    
            </div>

        </div>
    </div>

</template>



<script>
export default {
  name: 'HomeComponent',

}
</script>

<style scoped>

body {
    background-color: #22b6a99c;
    background-repeat: no-repeat;
    background-size: 100%;
    text-align: center;
    color: #d6c475fd;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}

.contenedorPrincipal {
    background-color: #030302a6;
    margin: 5%;
    min-width: 80%;
    min-height: 70%;
    max-height: 200vh;
    max-width: 150vh;
    border-radius: 20px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.contenedorInferior {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    gap: 10%;
}

.contenedorDerecho, .contenedorIzquierdo {
    background-color: #3b6cc77a;
    padding: 30px;
    width: 45%;
    height: 50%;
    border-radius: 8px;
    text-align: justify;
    line-height: 25px;
    position: relative;
}


.contenedorDerecho form {
    text-align: center; 
    margin-top: 20px; 
}

.contenedorDerecho button {
    background-color: rgb(0, 0, 0);
    color: rgba(240, 226, 34, 0.658);
    font-family: sans-serif;
    border: 0;
    border-radius: 0 70px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    margin: 5px;
    font-size: 20px;
    box-sizing: content-box;
    padding: 20px;
    min-width: 20%;
    touch-action: manipulation;
    transition: background 0.7s;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contenedorDerecho button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.contenedorDerecho h2 {
    text-align: center;
}

.contenedorIzquierdo button {
    background-color: rgb(0, 0, 0);
    color: rgba(240, 226, 34, 0.658);
    font-family: sans-serif;
    border: 0;
    border-radius: 0 70px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    margin: 5px;
    font-size: 20px;
    box-sizing: content-box;
    padding: 20px;
    min-width: 20%;
    touch-action: manipulation;
    transition: background 0.7s;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contenedorIzquierdo button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.contenedorIzquierdo form {
    text-align: center; 
    margin-top: 20px; 
}

</style>