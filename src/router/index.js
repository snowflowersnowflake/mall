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

import StoreList from '@/page/store_list/store_list'
import AddessList from '@/page/address/address_list'
import EditAddress from '@/page/address/edit_address'
import ChooseAddress from '@/page/address/choose_address'

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
      meta:{index:0},
      children: [
        {
          path: 'index',
          meta:{index:0},
          component: CusIndex,
        },
        {
          path: 'found',
          meta:{index:0},
          component: Found,
        }, {
          path: 'bills',
          meta:{index:0},
          component: Bills,
        }, {
          path: 'center',
          meta:{index:0},
          component: Center,
        },
      ]
    },
    {
      path: '/store',
      name: 'Store',
      component: Store,
      redirect: '/store/product',
      meta:{index:2},
      children: [
        {
          path: 'product',
          name: 'product',
          meta:{index:2},
          component: Product
        },
        {
          path: 'evaluation',
          name: 'evaluation',
          meta:{index:2},
          component: Evaluation
        },
        {
          path: 'seller',
          name: 'seller',
          meta:{index:2},
          component: Seller
        }
      ]
    },
    {
      path:'/list',
      name:'StoreList',
      meta:{index:1},
      component: StoreList
    },
    {
      path:'/addresslist',
      name:'AddessList',
      meta:{index:2},
      component: AddessList
    },
    {
      path:'/editaddress',
      name:'EditAddress',
      meta:{index:3},
      component:EditAddress
    },
    {
      path:'/chooseaddress',
      name:'ChooseAddress',
      meta:{index:1},
      component:ChooseAddress
    }
  ]
})
