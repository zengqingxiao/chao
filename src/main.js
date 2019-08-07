import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './filters'
import constants from './constants' // url配置

Vue.use(ElementUI);
// Vue.use(axios, VueAxios) 这里必须先写VueAxios 在写axios 这样的写法
Vue.config.productionTip = false

Vue.$constants = constants
Vue.prototype.$constants = constants

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
