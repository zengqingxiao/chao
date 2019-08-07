// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
// this.$store.dispatch('saveUserinfo', saveobj) // 分发执行vuex中actions中的事件
import types from './mutation-type'

const actions = {
  /**
   * 保存用户name和password
   */
  [types.SAVE_USERINFO] (context, obj = {}) {
    context.commit(types.SAVE_USERINFO, obj) // 再去mutations中去找事件执行
  },
  // 显示全局loading
  [types.SHOW_LOADING] ({ commit }) {
    commit(types.SHOW_LOADING)
  },

  // 隐藏全局loading
  [types.HIDE_LOADING] ({ commit }) {
    commit(types.HIDE_LOADING)
  },
}

export default actions