import Vue from 'vue'

import dataFilters from './data'

const filters = {
  ...dataFilters
}

for (let [name, filter] of Object.entries(filters)) {
  Vue.filter(name, filter)
}




//  经过main.js的引用就相当于是再全局写入