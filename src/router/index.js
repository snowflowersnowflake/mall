import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/page/main/main'
import CusIndex from '@/page/main/index'
import Found from '@/page/main/found/found'
import Bills from '@/page/main/bills/bills'
import Center from '@/page/main/center/center'

import Store from '@/page/store'
import Product from '@/page/store/product/product'
import Evaluation from '@/page/store/evaluation/evaluation'
import Seller from '@/page/store/seller/seller'

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      let scrollTop = store.state.common.scrollPos[to.name] || 0
      if (!scrollTop) {
        return
      }
      // 对scroll元素进行设置
      setTimeout(() => {
        let documentElem = document.querySelector('.v-content')
        if (documentElem) {
          documentElem.scrollTop = scrollTop
        }
      }, 0)
    }
  },
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/index',
      children: [
        {
          path: 'index',
          component: CusIndex,
        },
        {
          path: 'found',
          component: Found,
        }, {
          path: 'bills',
          component: Bills,
        }, {
          path: 'center',
          component: Center,
        },
      ]
    },
    {
      path: '/store',
      name: 'Store',
      component: Store,
      redirect: '/store/product',
      children: [
        {
          path: 'product',
          name: 'product',
          component: Product
        },
        {
          path: 'evaluation',
          name: 'evaluation',
          component: Evaluation
        },
        {
          path: 'seller',
          name: 'seller',
          component: Seller
        }
      ]
    }
  ]
})
