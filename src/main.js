// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Rate } from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/swiper.min.css';
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import "font-awesome/css/font-awesome.min.css"
import "@/style/icon/iconfont.css"
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import { Toast, Indicator, MessageBox } from "mint-ui"
import { getStorage, rmStorage } from "@/script/storage"
import Es6Promise from 'es6-promise'

var allowNotLoginApi = ['getUserInfo', 'haveCart', 'getCart', 'getCollections']

Es6Promise.polyfill()
axios.interceptors.request.use(config => {
  config.headers.authorization = getStorage("token")
  config.headers.dn = Date.now()
  if (!config.headers.notIndicator) {
    Indicator.open("加载中...")
  }
  return config
})
axios.interceptors.response.use(response => {
  const status = response.data.status;
  const data = response.data
  const url = response.config.url
  switch (status) {
    case -1:
      rmStorage('token');
      var isAllow = allowNotLoginApi.some(item => {
        return url.indexOf(item) > -1
      })
      if (!isAllow) {
        console.log(url)
        if (url.indexOf("addCart") > -1 || url.indexOf("addCart") > -1 || url.indexOf("editCollections") > -1) {
          Indicator.close()
          MessageBox.confirm('尚未登录,是否前往登录页?').then(() => {
            router.replace("/login")
          }).catch(e => { })
        } else {
          Toast({
            message: "未登录",
            position: "bottom"
          })
          router.replace("/login")
        }
      }
     
      break;
    case 0:
      Toast({
        message: data.msg,
        position: "bottom"
      })
      break;
    case 10:
      console.log('后台错误')
      break
    default:
  }
  Indicator.close()
  return response
}, err => {
  Indicator.close()
  return Promise.reject(err)
})

Vue.use(VueAxios, axios);
Vue.component('el-collapse-transition', CollapseTransition)
Vue.component('el-rate', Rate)
Vue.use(Mint);
Vue.use(VueLazyload, {
  loading: require('@/assets/loading.svg'),
  //error: require('@/assets/error.png')
})
Vue.config.productionTip = false

var html = document.documentElement;
var hWidth = html.getBoundingClientRect().width;
html.style.fontSize = hWidth / 18 + "px";

const AllowNotLogin = ['Index', 'Found', 'Center', 'StoreList', 'Product', 'Evaluation', 'Seller', 'Login', 'Reg']

router.beforeEach((to, from, next) => {
  var token = getStorage('token');

  next()
  if (token) {
    next()
  } else {
    var allowNext = AllowNotLogin.some(item => {
      return item == to.name
    })
    if (allowNext) {
      next()
    } else {
      next({ path: "/login", /* replace: true */ })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
