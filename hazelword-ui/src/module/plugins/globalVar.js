import xss from 'xss' // xss过滤
import {
  getBizType,
  getPlatformType,
  getUa,
  setWXSDK,
  isWeixin
} from '@/module/tools' // 简易状态管理
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import API from '@/module/API' // 引入API模块
import store from '@/module/store' // 简易状态管理
import { ApiPromise, WsProvider } from '@polkadot/api'
import countTo from 'vue-count-to'
let GlobalPlugin = {}

GlobalPlugin.install = Vue => {
  Vue.use(ViewUI)
  // 添加微信ready方法
  Vue.prototype.$wxReady = setWXSDK
  Vue.prototype.$isWeixin = isWeixin()
  // 添加简易状态管理
  window.$storage = store
  Vue.prototype.$storage = store

  Vue.component('countTo', countTo)

  // 添加XSS过滤方法
  Vue.prototype.$xss = xss

  // 添加API模块
  Vue.prototype.$api = new API()

  // 添加 polka api
  // const provider = new WsProvider('wss://rpc.polkadot.io')
  const provider = new WsProvider('wss://westend-rpc.polkadot.io') // 测试网
  Vue.prototype.$polkaApi = new ApiPromise({ provider })

  // 获取部分公共属性
  Vue.prototype.$getBizType = getBizType
  Vue.prototype.$getPlatformType = getPlatformType
  const ua = getUa()
  Vue.prototype.$ua = ua
  Vue.prototype.$storage.set('ua', ua)
  const event = new Vue()
  Vue.prototype.$event = event

  // 处理微信软键盘弹出后页面无法回弹问题
  Vue.prototype.$scrollBy = (x, y) => {
    window.scrollBy(x, y)
  }

  Vue.prototype.$global = {
    IMG_HOST: 'https://static..me/',
    staticImgHome: 'https://static..me/images/wap/home/v2/', // 对应home的图片地址
    staticImgGoodsDetail: 'https://static..me/images/wap/goods-detail/assets/'
  }
}

export default GlobalPlugin
