import indexNav from './modules/nav'
import Vue from 'vue';
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
    state:{
        show:false
    },
    modules:{
        nav:indexNav
    }
})