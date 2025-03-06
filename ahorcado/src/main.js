import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

// Configura Vue Router
app.use(router);

// Configura Vue SweetAlert2
app.use(VueSweetalert2);

// Monta la aplicación
app.mount('#app');


//createApp(App).mount('#app')
