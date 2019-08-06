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
// 分享页面
import Share from 'vue-social-share'
// import wx from 'weixin-js-sdk'
import 'vue-social-share/dist/client.css'
Vue.use(Share)

// wx.config({
//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: 'wxad7f049d4f901132', // 必填，公众号的唯一标识
//   timestamp: new Date().valueOf(), // 必填，生成签名的时间戳
//   nonceStr: '2341', // 必填，生成签名的随机串
//   signature: '2341',// 必填，签名
//   jsApiList: [] // 必填，需要使用的JS接口列表
// });

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
