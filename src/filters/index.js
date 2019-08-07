import Vue from 'vue'

import dataFilters from './data'


const filters = {
  ...dataFilters
}

for (let [name, filter] of Object.entries(filters)) {
  Vue.filter(name, filter)
}

// 先整合再拆开，将不同的方法模块化这里我只是定义了dataFilters这个模块



//  经过main.js的引用就相当于是再全局写入