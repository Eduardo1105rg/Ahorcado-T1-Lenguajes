
<template>

<HomeComponent/>

</template>

<script>

  import HomeComponent from './components/HomeComponent.vue';

  const { solicitarPalabras } = require('./ConexionAPI/APIService');

  let datos = await solicitarPalabras();

  print("Datos optenidos: ", datos);

  export default {
    name: 'App',
    components: {
      HomeComponent
    }
  }


</script>

<style>


</style>