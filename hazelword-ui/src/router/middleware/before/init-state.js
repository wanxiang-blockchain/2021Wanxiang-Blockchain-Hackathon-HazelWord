/*
 * @Description: 在此输入描述
 * @Date: 2019-07-01 15:51:53
 * @Author: 郑道杨
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-02-06 10:54:39
 */
/*
 * File: pay-pre-data.js
 * Project: sz-html-tpl-vue
 * File Created: Wednesday, 20th March 2019 3:15:46 pm
 * Author: 王浩
 * -----
 * Last Modified: Wednesday, 20th March 2019 3:16:04 pm
 * Modified By: 王浩
 * -----
 * Desc: 自动登录中间件，页面跳转前处理，需保证登录态成功拿到后再进行跳转
 *    这里主要是支付的业务中会包含从微信跳转到浏览器中支付，所以需要同步状态，这里添加的参数主要是用来做同步登录态的
 */
import Vue from 'vue'
import {
  initStoreState
} from '@/module/tools' // 导入工具包

async function initState (to, from, next) {
  // 设置页面标题
  to.query._t = String(new Date().getTime())
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.fullPath.includes('login')) {
    next && next()
    return
  }

  try {
    await Vue.prototype.$api.refreshLoginStatus()
  } catch (err) {
    console.log('刷新登录接口异常')
  }

  initStoreState()
  next && next()
}

export default initState
