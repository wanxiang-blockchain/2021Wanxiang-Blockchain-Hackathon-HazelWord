/*
 * @Date: 2020-03-29 16:58:48
 * @Author: 李明洋
 * @Desc: store
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { homeModule } from './modules/index'
// 数据持久化插件
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [createPersistedState()],
  modules: {
    $_home: homeModule
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {}
})

export default store
