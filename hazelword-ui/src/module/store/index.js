/*
 * @Author: your name
 * @Date: 2020-02-04 21:48:41
 * @LastEditTime : 2020-02-05 23:00:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sz-html-activity-vue/src/module/store/index.js
 */
/*
 * File: index.js
 * Project: sz-html-wap-vue
 * File Created: Tuesday, 3rd July 2018 3:12:44 pm
 * Author: 王浩
 * -----
 * Last Modified: Wednesday, 11th July 2018 4:45:02 pm
 * Modified By: 王浩
 * -----
 * Desc: 简易状态管理
 */

var store = {
  debug: true, // 是否开启调试
  state: {
    ua: {}, // 当前设备userAgent
    isLogin: false, // 是否已登录
    szMemberCode: '', // memberCode（埋点用）
    maskMobile: '', // 用户掩码后的手机号
    isAgreeProto: false // 用户是否主动授权了协议
  },
  usesession: [ // 存到session中的key只使用sessionStorage
    'noInsurance'
  ],
  set (key, value) {
    if (!Object.keys(this.state).includes(key)) {
      throw (new Error(`\n当前key:${key}不在状态中，如需使用该键，请在状态中预先设置\n/src/module/store/index.js`))
    }
    const type = typeof this.state[key]

    // 布尔类型，true存为'1', false存为'0'
    if (type === 'boolean') {
      this.state[key] = value
      this.usesession.includes(key)
        ? sessionStorage.setItem(key, value ? '1' : '0')
        : localStorage.setItem(key, value ? '1' : '0')
    } else if (type === 'string') { // string类型，直接存储（state不要定义number类型，防止类型不统一）
      this.state[key] = value + ''
      this.usesession.includes(key)
        ? sessionStorage.setItem(key, value)
        : localStorage.setItem(key, value)
    } else {
      this.state[key] = value
      console.error(`localStorage不支持object类型,出错的key为${key},类型为${type},值为${value}`)
    }

    if (this.debug) console.log('设置成功', key, value)
  },
  get (key) {
    if (!Object.keys(this.state).includes(key)) {
      throw (new Error(`\n当前key:${key}不在状态中，如需使用该键，请在状态中预先设置\n/src/module/store/index.js`))
    }
    if (typeof this.state[key] === 'boolean') {
      return localStorage.getItem(key) === '1'
    } else {
      return localStorage.getItem(key)
    }
  },
  clear () {
    if (this.debug) console.log('所有状态已清空')
    Object.keys(this.state).forEach(key => {
      this.state[key] = ''
    })
  }

}

export default store
