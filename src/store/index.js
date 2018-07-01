import Vue from 'vue';
import vuex from 'vuex'
import indexNav from './modules/nav'
import store_ from './modules/store_msg'
import toast from './modules/toast'
Vue.use(vuex)

export default new vuex.Store({
    state:{
        show:false
    },
    modules:{
        nav:indexNav,
        store:store_,
        toast
    },
})