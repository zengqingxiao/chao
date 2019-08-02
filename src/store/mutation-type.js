// 由于写Vuex的时候不管是状态是在异步还是不是异步都最后是先分(store.dispatch)发给actions再在actions中去(commit)运行mutations中的事件,从而改变状态
// 但是如果事件名发生了修改可能要改两的地方所以会麻烦一点
// 所以在这里定义事件名那么我们就可以在这里改一次,mutations和actions就会同时被更改
export default {
  SAVE_USERINFO: 'saveUserinfo', //保存用户信息 (name;password)
  SHOW_LOADING: 'showLoading',
  HIDE_LOADING: 'hideLoading'
}