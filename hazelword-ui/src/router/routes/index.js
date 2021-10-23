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
const routers = []
// console.log('files', files.keys())
files.keys().forEach(key => {
  if (key === './index.js') return
  // console.log('files', key.replace(/(\.\/|\.js)/g, ''), files(key).default)
  // 如果是数组，表示是others的路由，所以需要解构添加
  if (files(key).default instanceof Array) {
    routers.push(...files(key).default)
  } else if(files(key).default instanceof Object) {
    routers.push(files(key).default)
  }
})
// console.log(routers)
export default routers
