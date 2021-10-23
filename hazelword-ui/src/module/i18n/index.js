/*
 * File: index.js
 * Project: sz-html-backstage-vue
 * File Created: Wednesday, 17th April 2019 4:59:16 pm
 * Author: 王浩
 * -----
 * Last Modified: Wednesday, 17th April 2019 5:38:40 pm
 * Modified By: 王浩
 * -----
 * Desc: router入口文件，此处内容无特殊情况请勿修改
 */

/*  eslint-disable */

const files = require.context('.', false, /\.js$/)
const locale = localStorage.getItem('hazel_locale') || 'en_US'
const i18nData = {
  locale, // 设置地区
  messages: {} // 设置地区信息
}
// console.log('files', files.keys())
files.keys().forEach(key => {
  if (key === './index.js') return
  // console.log('files', key.replace(/(\.\/|\.js)/g, ''), files(key).default)
  // 如果是数组，表示是others的路由，所以需要解构添加
  const reg = /\.\/(.*)\.js$/

  const localeKey = reg.exec(key)[1]

  if (localeKey) {
    i18nData.messages[localeKey] = files(key).default
  }
})

export default i18nData
