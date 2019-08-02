import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
// import modules from './modules'
import createLogger from 'vuex/dist/logger'  // Vuex 自带一个日志插件用于一般的调试:

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
  // modules: modules,
  plugins: debug ? [
    createLogger({})
  ] : []
})
