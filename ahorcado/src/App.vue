
<template>
  <div id="app">
    <header>
      <nav>
        <!-- <router-link to="/">Inicio</router-link>
        <router-link to="/juego">Juego</router-link> -->
        <!-- <router-link to="/estadisticas">Estadísticas</router-link> -->
      </nav>
    </header>
    <main>
      <!-- Aquí se renderiza la página correspondiente según la ruta -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  display: flex;
  gap: 20px;
}
nav a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}
nav a:hover {
  text-decoration: underline;
}
</style>
