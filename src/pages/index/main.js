import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts'
import App from './App.vue'
import '../../plugins/element.js'
import 'element-ui/lib/theme-chalk/display.css';
// 处理axios的baseURL
import axios from 'axios'
Vue.prototype.axios = axios;
import global_ from './Global.vue'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL = global_.BASE_URL;
Vue.prototype.axios = axios;


// import VueLazyload from 'vue-lazyload'
// // Vue.use(VueLazyload)
// // or with options
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   // error: 'wx.png',
//   loading: 'img/loading.gif',
//   attempt: 1
// })

Vue.use(ElementUI);
Vue.use(VCharts)

Vue.config.productionTip = false
import 'vuetify/src/stylus/app.styl'
import Vuetify, {
  VApp, // required
  VCard,
  VImg,
  VDivider,
  VProgressCircular,
  VProgressLinear
} from 'vuetify/lib'
Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VImg,
    VDivider,
    VProgressCircular,
    VProgressLinear
  }
})
// 分享页面
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css'
Vue.use(Share)

new Vue({
  render: h => h(App),
}).$mount('#app')