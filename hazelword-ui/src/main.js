// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
import './assets/fonts/font' // 引入字体
import './assets/js/plugins/rem' // 引入rem布局
import '@/scss/main.scss'

// plugins
import global from '@/module/plugins/globalVar'
import debug from '@/module/plugins/debugTools'
import imgFilter from '@/module/plugins/filters'
import VueI18n from 'vue-i18n'

// filters
import imgData from '@/module/mixins/data'

import i18nData from '@/module/i18n'

// use plugins
Vue.use(global)
  .use(debug)
  .use(imgFilter)
  .use(VueI18n)
// mixins
Vue.mixin(imgData)

Vue.config.productionTip = false

const i18n = new VueI18n(i18nData)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
