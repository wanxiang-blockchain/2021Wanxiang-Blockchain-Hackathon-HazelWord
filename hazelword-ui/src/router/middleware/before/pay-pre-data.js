/*
 * File: pay-pre-data.js
 * Project: sz-html-tpl-vue
 * File Created: Wednesday, 20th March 2019 3:15:46 pm
 * Author: 王浩
 * -----
 * Last Modified: Wednesday, 20th March 2019 3:16:04 pm
 * Modified By: 王浩
 * -----
 * Desc: 同步支付前置数据中间件
 *    这里主要是支付的业务中会包含从微信跳转到浏览器中支付，所以需要同步状态，这里添加的参数主要是用来做同步登录态的
 */
import Vue from 'vue'
import { queryStringfy, isWeixin, getNonceStr, getSzpl } from '@/module/tools'

function payPreData (to, from) {
  return new Promise((resolve, reject) => {
    const user = getNonceStr(32)
    // 微信内，并且是支付页，执行路由前置操作（加上免登录验签）
    if (isWeixin() && ['pay', 'mvpPay', 'cooperation_pay', 'medicalPay', 'promptPay', 'servicePay'].includes(to.path.split('/')[2])) {
      if (to.query.user === undefined) {
        Vue.prototype.$api.get('/is/wap/pay/pre_query_new', { user })

        to.query._t = Date.now()
        to.query.user = user
        to.query.szpl = getSzpl()

        setTimeout(() => {
          location.replace(`${to.path}?${queryStringfy(to.query)}`)
        }, 200)
        return
      } else {}
    } else {
      console.log('不是支付页，或者不在微信内')
    }
    resolve()
  })
}

export default payPreData
