// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
import types from './mutation-type'

const mutations = {
  //用户信息
  [types.SAVE_USERINFO] (store, { name, password } = {}) {
    // window.console.log(this);
    // window.console.log(password);
    store.name = name;
    store.passWord = password;
  },
  // 显示全局loading
  [types.SHOW_LOADING] (state) {
    state.LOADING = true
  },
  // 隐藏全局loading
  [types.HIDE_LOADING] (state) {
    state.LOADING = false
  }
}
export default mutations