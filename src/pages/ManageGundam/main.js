import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css';
// 处理axios的baseURL
import axios from 'axios'
import global_ from './Global.vue'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL = global_.BASE_URL;
Vue.prototype.axios = axios;

Vue.use(ElementUI);
import 'vuetify/src/stylus/app.styl'
import Vuetify, {
  VApp, // required
  VCard,
  VImg,
  VDivider,
  VProgressCircular
} from 'vuetify/lib'
Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VImg,
    VDivider,
    VProgressCircular
  }
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')