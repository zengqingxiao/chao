import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'
import { API_HOST } from '@/constants'
Vue.use(VueAxios, axios)

//再所有的请求前加的内容
Vue.axios.defaults.baseURL = API_HOST

/**
 * 显示loading
 * @param loading
 */
function showLoading (loading) {
  if (loading) {
    store.dispatch('showLoading')
  }
}

/**
 * 隐藏loading
 * @param loading
 */
function hideLoading (loading) {
  if (!loading) return
  store.dispatch('hideLoading')
}

/**
 * 通用请求函数
 * @param {*} type
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
export const apiRequest = ({ url, type = 'post', data = {}, ...options } = {}) => {
  const datas = type === 'get' ? { params: data } : { data: data }
  const loading = options.loading === undefined ? true : options.loading // loading默认开启
  showLoading(loading)
  return axios.request({
    url,
    method: type,
    ...datas
  }).catch(() => {
    hideLoading(loading)
  }).then(res => {
    hideLoading(loading)
    return res
  })
}

/*
* get 请求
* @param url
* @param data
* options 是否有loading
* */

export const GET = ({ url, data = {}, ...options } = {}) => apiRequest({
  type: 'get',
  url,
  data,
  ...options
})


/*
* post 请求
* @param url
* @param data
* */

export const POST = ({ url, data = {}, ...options } = {}) => apiRequest({
  type: 'post',
  url,
  data,
  ...options
})
