import { createRouter, createWebHistory } from 'vue-router';
import JuegoComponent from '@/pages/juego/JuegoComponent.vue';
import EstadisticasComponent from '@/pages/estadisticas/EstadisticasComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/HomeComponent.vue'),
  },
  {
    path: '/juego',
    name: 'Juego',
    component: JuegoComponent,
  },
  {
    path: '/estadisticas',
    name: 'Estadisticas',
    component: EstadisticasComponent,
  },
];

const router = createRouter({
  history: createWebHistory(), // Configura el historial para URLs limpias
  routes, // Define las rutas
});

export default router;

