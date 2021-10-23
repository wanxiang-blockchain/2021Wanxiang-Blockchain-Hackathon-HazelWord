import Vue from 'vue'
import Router from 'vue-router'
import beforeMiddleWare from '@/router/middleware/before/index'
import afterMiddleWare from '@/router/middleware/after/index'

import routes from './routes/index.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'home' } }, // 首页进入重定向到home
    ...routes
  ]
})

// 注册前置守卫
router.beforeEach(async (to, from, next) => {
  callFn(beforeMiddleWare, to, from, next)
  // // 同步执行前置中间件
  // try {
  //   for (let fn of beforeMiddleWare) {
  //     await fn(to, from)
  //   }
  //   next()
  // } catch (err) {
  //   next()
  // }
  // callFn(beforeMiddleWare, to, from, next)
  // Vue.prototype.$event.$emit('router-ready')
})

// 全局后置路由钩子
router.afterEach((to, from) => {
  try {
    for (const fn in afterMiddleWare) {
      afterMiddleWare[fn](to, from)
    }
  } catch (err) {

  }
})

// 调用中间件
function callFn (list = [], to, from, next) {
  const fn = list.shift()
  let isOk = false
  if (fn) {
    fn(to, from).then(() => {
      isOk = true
      callFn(list, to, from, next)
    }).catch(() => {
      isOk = true
      Vue.prototype.$event.$emit('router-ready')
      next && next()
    }).finally(() => {
      // isOk 为true，表示已经执行过 then 或 catch，无需递归
      if (!isOk) {
        callFn(list, to, from, next)
      }
    })
  } else {
    Vue.prototype.$event.$emit('router-ready')
    next && next()
  }
}

export default router
