import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import axios from './http';
import router from './router';
import vuetify from './plugins/vuetify';

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(VueAxios, axios);

app.mount('#app');
