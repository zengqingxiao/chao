import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router) // 全局定义

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/register',
      name: ''
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue'),
      meta: {
        title: '登录页'
      }
    },
    {
      path: '/member-link',
      name: 'member-link',
      component: () => import('../views/member-link.vue'),
      meta: {
        title: '会员类型列表'
      },
      children: []
    },
    {
      path: '/member-detail',
      name: 'member-datail',
      component: () => import('../views/member-detail.vue'),
      meta: {
        title: '会员列表详细'
      }
    }
  ]
})