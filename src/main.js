import { createApp } from 'vue'
import App from './App.vue'
import "element-plus/dist/index.css";
import ElementPlus from "./components/UI/elements.js";
import FlagIcon from 'vue-flag-icon'
import router from './routes';
import "./assets/icofont/icofont.css";
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import VueCookies from 'vue-cookies';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App).use(Quasar, quasarUserOptions);
app.use(VueCookies);

app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
axios.defaults.baseURL = "http://172.23.20.170:63851/"//"http://localhost:63851/"
app.use(FlagIcon);
app.use(ElementPlus);
app.use(router);
app.mount("#app");