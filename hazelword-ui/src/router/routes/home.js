/*
 * @Author: 王浩
 * @Date: 2020-10-10 09:09:57
 * @Last Modified by: 王浩
 * @Last Modified time: 2021-03-21 18:43:16
 * 主入口路由
 */
const basePath = process.env.VUE_APP_BASE_PATH
export default [
  {
    path: basePath + '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/home.vue'),
    meta: {
      title: ''
    }
  },
  // 抵押
  {
    path: basePath + '/mortgage',
    name: 'mortgage',
    component: () => import('@/views/home/mortgage.vue'),
    meta: {
      title: ''
    }
  },
  // 资产数据
  {
    path: basePath + '/assets',
    name: 'assets',
    component: () => import('@/views/home/assets.vue'),
    meta: {
      title: ''
    }
  }
]
