import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import axios from './http';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import vue3GoogleLogin from 'vue3-google-login';
import Notifications from '@kyvg/vue3-notification';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);
app.use(VueAxios, axios);
app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_API_GOOGLE_AUTH_CLIENT_ID,
});
app.use(Notifications);

app.mount('#app');
