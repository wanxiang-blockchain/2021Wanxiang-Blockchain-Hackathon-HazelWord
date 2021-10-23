/*
 * @Description: 在此输入描述
 * @Date: 2019-07-01 15:51:53
 * @Author: 郑道杨
 * @LastEditors: 郑道杨
 * @LastEditTime: 2019-08-13 16:31:36
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
import { getCookie, getAuthCode, setLoginStatus, initStoreState } from '@/module/tools' // 导入工具包

function autoLogin (to, from) {
  return new Promise((resolve, reject) => {
    if (getCookie('islogin') !== '1') {
      login().finally(() => {
        resolve()
      })
    } else {
      Vue.prototype.$api.refreshLoginStatus().then(() => {
        if (getCookie('islogin') !== '1') {
          login().finally(() => {
            resolve()
          })
        } else {
          initStoreState()
          resolve()
        }
      })
    }
  })
}

function login () {
  return new Promise((resolve, reject) => {
    getAuthCode().then(auth => {
      Vue.prototype.$api[auth.method](auth.data).then(res => {
        if (res.data.SZ_HEAD.RESP_CODE === 'S0000') {
          setLoginStatus(Vue.prototype, res.data.SZ_BODY.LOGIN_D)
        }
      }).finally(() => {
        initStoreState()
        console.log('内层resolve')
        // 登录成功后需要调用下会员接口，因为在登录失效时会员信息会被置空，自动登录后不调用vip接口会员信息就会出现不同步的问题
        Vue.prototype.$api.queryVipUserInfo().then(() => {
          resolve()
        })
      })
    }).catch(() => {
      initStoreState()
      console.log('外层resolve')
      Vue.prototype.$api.refreshLoginStatus().then(() => {
        resolve()
      })
    })
  })
}

export default autoLogin
