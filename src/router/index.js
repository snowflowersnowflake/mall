import Vue from 'vue'
import Router from 'vue-router'

const Main = r => require.ensure([], () => r(require('@/page/main/main')), 'main');
const CusIndex = r => require.ensure([], () => r(require('@/page/main/index')), 'index');
const Found = r => require.ensure([], () => r(require('@/page/main/found/found')), 'found');
const Bills = r => require.ensure([], () => r(require('@/page/main/bills/bills')), 'bill');
const Center = r => require.ensure([], () => r(require('@/page/main/center/center')), 'center');
const UserInfo = r => require.ensure([], () => r(require('@/page/main/center/userinfo')), 'UserInfo');

const AllCart = r => require.ensure([], () => r(require('@/page/store_list/all_cart'), 'AllCart'))

const Store = r => require.ensure([], () => r(require('@/page/store'), 'store'))
const Product = r => require.ensure([], () => r(require('@/page/store/product/product'), 'store'))
const Evaluation = r => require.ensure([], () => r(require('@/page/store/evaluation/evaluation'), 'Evaluation'))
const Seller = r => require.ensure([], () => r(require('@/page/store/seller/seller'), 'Seller'))
const Checkout = r => require.ensure([], () => r(require('@/page/store/checkout/checkout'), 'Checkout'))
const BillDetail = r => require.ensure([], () => r(require('@/page/store/checkout/bill'), 'bill'))
const Rate = r => require.ensure([], () => r(require('@/page/store/checkout/rate'), 'rate'))

const StoreList = r => require.ensure([], () => r(require('@/page/store_list/store_list'), 'StoreList'))
const AddessList = r => require.ensure([], () => r(require('@/page/address/address_list'), 'AddessList'))
const EditAddress = r => require.ensure([], () => r(require('@/page/address/edit_address'), 'EditAddress'))
const ChooseAddress = r => require.ensure([], () => r(require('@/page/address/choose_address'), 'ChooseAddress'))

const Search = r => require.ensure([], () => r(require('@/page/search/search'), 'Search'))
const Collection = r => require.ensure([], () => r(require('@/page/main/center/collection'), 'collection'))

const Login = r => require.ensure([], () => r(require('@/page/login/login'), 'login'))
const Reg = r => require.ensure([], () => r(require('@/page/login/reg'), 'login'))
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/index',
      meta: { index: 0 },
      children: [
        {
          path: 'index',
          name: "Index",
          meta: { index: 0 },
          component: CusIndex,
        },
        {
          path: 'found',
          name: "Found",
          meta: { index: 0 },
          component: Found,
        }, {
          path: 'bills',
          name: "Bills",
          meta: { index: 0 },
          component: Bills,
        }, {
          path: 'center',
          name: "Center",
          meta: { index: 0 },
          component: Center,
        },
      ]
    },
    {
      path: '/store',
      name: 'Store',
      component: Store,
      redirect: '/store/product',
      meta: { index: 2 },
      children: [
        {
          path: 'product',
          name: 'Product',
          meta: { index: 2 },
          component: Product
        },
        {
          path: 'evaluation',
          name: 'Evaluation',
          meta: { index: 2 },
          component: Evaluation
        },
        {
          path: 'seller',
          name: 'Seller',
          meta: { index: 2 },
          component: Seller
        }
      ]
    },
    {
      path: '/list',
      name: 'StoreList',
      meta: { index: 1 },
      component: StoreList
    },
    {
      path: '/addresslist',
      name: 'AddessList',
      meta: { index: 2 },
      component: AddessList
    },
    {
      path: '/editaddress',
      name: 'EditAddress',
      meta: { index: 10 },
      component: EditAddress
    },
    {
      path: '/chooseaddress',
      name: 'ChooseAddress',
      meta: { index: 1 },
      component: ChooseAddress
    },
    {
      path: '/search',
      name: 'Search',
      meta: { index: 99 },
      component: Search
    },
    {
      path: '/collection',
      name: 'Collection',
      meta: { index: 1 },
      component: Collection
    },
    {
      path: '/checkout',
      name: "Checkout",
      component: Checkout,
      meta: { index: 5 }
    },
    {
      path: '/login',
      name: "Login",
      component: Login,
      meta: { index: 10 }
    },
    {
      path: '/reg',
      name: "Reg",
      component: Reg,
      meta: { index: 20 }
    },
    {
      path: '/userinfo',
      name: 'UserInfo',
      meta: { index: 3 },
      component: UserInfo
    },
    {
      path: '/billDetail',
      name: 'BillDetail',
      meta: { index: 3 },
      component: BillDetail
    },
    {
      path: '/rate',
      name: 'Rate',
      meta: { index: 3 },
      component: Rate
    },
    {
      path: '/allCart',
      name: 'AllCart',
      meta: { index: 3 },
      component: AllCart
    }
  ]
})