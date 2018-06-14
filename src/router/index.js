import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Main from '@/page/main/main'
import CusIndex from '@/page/main/index'
import Found from '@/page/main/found/found'
import Bills from '@/page/main/bills/bills'
import Center from '@/page/main/center/center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect:'/index',
      children:[
        {
          path:'index',
          component: CusIndex,
        },
        {
          path:'found',
          component: Found,
        },{
          path:'bills',
          component: Bills,
        },{
          path:'center',
          component: Center,
        },
      ]
    }
  ]
})
