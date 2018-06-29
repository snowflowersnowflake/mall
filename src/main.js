// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/swiper.min.css';
import App from './App'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
Vue.use(ElementUI);

Vue.config.productionTip = false

var html = document.documentElement;
var hWidth = html.getBoundingClientRect().width;
html.style.fontSize = hWidth / 18 + "px";

window.onresize = function () {
  var html = document.documentElement;
  var hWidth = html.getBoundingClientRect().width;
  html.style.fontSize = hWidth / 18 + "px";
}

// rem 69
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})
