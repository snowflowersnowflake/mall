import Vue from 'vue';
import vuex from 'vuex'
import indexNav from './modules/nav'
import store_ from './modules/store_msg'
Vue.use(vuex)

export default new vuex.Store({
    state:{
        show:false
    },
    modules:{
        nav:indexNav,
        store:store_
    }
})