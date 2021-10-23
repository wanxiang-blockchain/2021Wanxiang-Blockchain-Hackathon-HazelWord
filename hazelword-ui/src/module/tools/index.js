/*
 * @Description: 在此输入描述
 * @Date: 2019-09-28 17:03:42
 * @Author: 郑道杨
 * @LastEditors: 郑道杨
 * @LastEditTime: 2019-10-11 01:39:04
 */
// 检测返回值
export function checkRes (json) {
  return new Promise((resolve, reject) => {
    if (json.SZ_HEAD.RESP_CODE === 'S0000') {
      // 请求成功
      resolve({
        data: json.SZ_BODY
      })
    } else {
      resolve({
        data: '',
        error: json.SZ_HEAD.RESP_CODE,
        msg: json.SZ_HEAD.RESP_MSG
      })
    }
  })
}

// 获取cookie、
export function getCookie (name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie (cName, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + '; path=/'
};

// 删除cookie
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
};

// 判断是否为微信
export function isWeixin () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera
  if (userAgent.indexOf('MicroMessenger') >= 0 && userAgent.indexOf('wxwork') < 0) {
    return true
  }
  return false
};

// 判断是否在微信小程序内,（ 仅支持微信7.0 之后）
export function isMiniProgram () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera
  if (userAgent.indexOf('miniprogram') >= 0) {
    return true
  } else {
    return false
  }
};

// 判断是否为APP
export function isMyApp () {
  if (window.location.href.indexOf('h5.app') >= 0) {
    return true
  } else if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true
  }
  return false
};

// 获取业务类型
export function getBizType () {
  const {
    app
  } = getUa()

  let bizType = ''
  if (app === 'alipay') {
    bizType = '生活号'
  } else if (app === 'wx') {
    bizType = '公众号'
  } else { // 网页
    bizType = ''
  }
  return bizType
}

export function getPlatformType () {
  const {
    app,
    os
  } = getUa()

  let platformType = ''
  let isMobile = (os === 'android' || os === 'ios')
  let isAlipay = (app === 'alipay')
  let isWx = (app === 'wx')

  if (isAlipay) {
    platformType = 'ali'
  } else if (isWx) {
    platformType = 'wechat'
  } else if (isMobile) {
    platformType = 'mobile'
  } else {
    platformType = 'pc'
  }

  return platformType
}

/**
 * 检测是否为移动端
 */
export function isMobile () {
  if (/http(s?):\/\/m/.test(location.origin)) {
    // 正常判断方法
    return true
  } else if (location.href.indexOf('wap') > -1) {
    // 兼容开发环境
    return true
  } else if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true
  }
}

// 判断是否为Hazelapp
export function isSZApp () {
  if (navigator.userAgent.indexOf('com..') > -1) {
    return true
  } else {
    return false
  }
}

export function urlEncode (param, encode) {
  if (param === null) return ''
  var paramArr = []
  // eslint-disable-next-line no-unused-vars
  for (let key in param) {
    paramArr.push(`${key}=${((encode === null || encode) ? encodeURIComponent(param[key]) : param[key])}`)
  }
  return paramArr.join('&')
}

export function scrollTo (element, to = 0) {
  let timer = null
  let start

  const scroll = function () {
    if (start && element.scrollTop > start) {
      clearInterval(timer)
      document.removeEventListener('scroll', scroll)
    }
  }
  document.addEventListener('scroll', scroll)

  timer = setInterval(() => {
    start = element.scrollTop
    const speed = Math.ceil(start / 7)
    const target = element.scrollTop - speed

    if (element.scrollTop <= to) {
      element.scrollTop = to
      clearInterval(timer)
    } else {
      element.scrollTop = target
    }
  }, 10)
}

// 运动
export const moveTo = (() => {
  let timer = null
  return function (el, to) {
    console.log('一进入', to)
    let start

    const preventDefault = function (e) {
      e.preventDefault()
    }

    // 初始化，重置上一次的内容
    clearInterval(timer)
    el.removeEventListener('touchstart', preventDefault)
    el.addEventListener('touchstart', preventDefault, false)
    timer = setInterval(() => {
      start = el.scrollTop
      const speed = Math.ceil(Math.abs(start - to) / 6)
      if (el.scrollTop < to) { // 往下走
        el.scrollTop += speed
      } else if (el.scrollTop > to) { // 往上走
        el.scrollTop -= speed
      } else {
        el.scrollTop = to
        el.removeEventListener('touchstart', preventDefault)
        clearInterval(timer)
      }
    }, 15)
  }
})()

// 获取平台,该方法主要用于后端接口
export function getSzpl () {
  const {
    app
  } = getUa()

  let isAlipay = (app === 'alipay')
  let isWx = (app === 'wx')

  if (isAlipay) {
    return process.env.VUE_APP_ALPAY_SZPL
  } else if (isWx) {
    return process.env.VUE_APP_WX_SZPL
  } else {
    return 'browser'
  }
}

// 判断是否为合格手机号
export function checkoutMobile (mobile) {
  return !!(/^1[3456789]\d{9}$/.test(mobile))
}

// 判断是否为合格验证码
export function checkoutVerifyCode (code) {
  return !!(/^\d{6}$/.test(code))
}

const cacheScript = {}
// 加载脚本
export function loadScript (url) {
  // 如果已经加载过相同脚本，则不再加载
  if (cacheScript[encodeURIComponent(url)]) return cacheScript[encodeURIComponent(url)]

  // 新加载脚本缓存中记录
  cacheScript[encodeURIComponent(url)] = new Promise((resolve, reject) => {
    const oDom = document.createElement('script')
    oDom.onload = function () {
      resolve()
    }

    oDom.onerror = function () {
      reject(new Error())
    }
    oDom.src = url
    document.querySelector('head').appendChild(oDom)
  })

  return cacheScript[encodeURIComponent(url)]
}

// 设置网站导航的小Icon
export function setIcon (imgUrl) {
  var icon = document.createElement('link')
  icon.type = 'image/x-icon'
  icon.rel = 'shortcut icon'
  icon.href = imgUrl
  document.getElementsByTagName('head')[0].appendChild(icon)
}

/**
 * 获取userAgent
 */
export function getUa () {
  const data = {}
  const u = navigator.userAgent

  // 判断OS
  if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
    data.os = 'android'
  } else if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    data.os = 'ios'
  } else {
    data.os = ''
  }

  // 判断用户app
  if (u.match(/Alipay/i)) {
    data.app = 'alipay'
  } else if (u.indexOf('MicroMessenger') >= 0 && u.indexOf('wxwork') < 0) {
    data.app = 'wx'
  } else {
    data.app = ''
  }
  console.log('ua', u, data)
  return data
}

/**
 * 自动登录，支持以下方式:
 *  支付宝
 * @result {Object} 调用登录的参数
 */
export function getAuthCode () {
  // 获取userAgent，判断需要走什么分支
  const ua = getUa()
  return new Promise((resolve, reject) => {
    console.log('--------开始获取authCode--------')
    // 如果服务器注明已登录
    if (getCookie('islogin') === '1') {
      reject(new Error('已登录，不需要再次登录'))
      return
    }

    /**
     * 1、获取授权code
     * 2、加载对应的SDK，加载结束后(不管成功失败)resolve
     */
    console.log('--------开始判断ua.app-------')
    let usedStr = localStorage.getItem('usedCodeArray')
    let usedArr = usedStr ? usedStr.split(',') : []
    switch (ua.app) {
      case 'alipay':
        // eslint-disable-next-line
        const auth_code = getQueryString('auth_code') // 由于在APP.vue中$route尚未初始化完成，所以拿不到query
        // eslint-disable-next-line
        if (!auth_code || usedArr.includes(auth_code)) {
          let arr = location.href.split('?')
          let norUrl = ''
          if (arr[1]) {
            norUrl = `${arr[0]}?${arr[1].split('&').filter(item => item.split('=')[0] !== 'code').join('&')}`
          } else {
            norUrl = `${arr[0]}`
          }
          /* eslint-disable */
          location.href = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${process.env.VUE_APP_ALPAY_APPID}&scope=auth_user&redirect_uri=${encodeURIComponent(norUrl)}`
        } else {
          usedArr.unshift(auth_code)
          if (usedArr.length > 5) {
            usedArr = usedArr.splice(0, 5)
          }
          localStorage.setItem('usedCodeArray', usedArr)
          loadScript('https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js').finally(() => {
            resolve({
              method: 'alipayLogin',
              data: {
                mp: process.env.VUE_APP_ALPAY_MP,
                authCode: auth_code,
                authScope: 'AUTH_USER' // AUTH_BASE
              }
            })
          })
        }
        break
      case 'wx':
        const code = getQueryString('code')
        console.log('code:' + code)
        // 设置usedArray里面都是已经使用的
        // snsapi_base
        // snsapi_userinfo
        if (!code || usedArr.includes(code)) {
          let arr = location.href.split('?')
          let norUrl = ''
          if (arr[1]) {
            norUrl = `${arr[0]}?${arr[1].split('&').filter(item => item.split('=')[0] !== 'code').join('&')}`
          } else {
            norUrl = `${arr[0]}`
          }
          console.log('------无code---------')
          location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.VUE_APP_WX_APPID}&redirect_uri=${encodeURIComponent(norUrl)}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
        } else {
          console.log('------有code && 未使用---------')
          usedArr.unshift(code)
          if (usedArr.length > 5) {
            usedArr = usedArr.splice(0, 5)
          }
          localStorage.setItem('usedCodeArray', usedArr)
          loadScript('https://res.wx.qq.com/open/js/jweixin-1.4.0.js').finally(() => {
            resolve({
              method: 'wxLogin',
              data: {
                mp: process.env.VUE_APP_WX_MP,
                authCode: code,
                authScope: 'SNSAPI_USERINFO' // SNSAPI_BASE
              }
            })
          })
        }
        break
      default:
        reject(new Error('当前应用无法获取授权码'))
        break
    }
  })
}

// 设置微信SDK
export function setWXSDK(vm) {
  const apiList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard', 'onVoiceRecordEnd', 'onVoicePlayEnd' ];
  return new Promise((resolve, reject) => {
    loadScript('https://res.wx.qq.com/open/js/jweixin-1.4.0.js').finally(() => {
      vm.$api.getSdkConfig().then(res => {
        if (res.data.SZ_HEAD.RESP_CODE === 'S0000') {
          console.log('获取配置1')
          const {
            appId,
            timestamp,
            nonceStr,
            signature
          } = res.data.SZ_BODY
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名，见附录1
            jsApiList: apiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          console.log('获取配置2')
          wx.ready(() => {
            console.log('微信SDKready')
            resolve()
          })
          wx.error(errInfo => {
            console.log('微信接口注册失败', errInfo)
            reject(errInfo)
          });
          console.log('获取配置3')
        }
      }).catch(err => {
        console.log('获取配置出错', err.toString())
        reject(new Error('获取配置出错'))
      })
    })
  })

}

// 设置登录状态
export function setLoginStatus(vm, LOGIN_D, backUrl = false) {
  return new Promise((resolve, reject) => {
    try {
      vm.$storage.set('isLogin', true)
      localStorage.setItem('isLogin', '1')

      if (LOGIN_D.maskMobile) { // 绑定了手机号
        console.log('绑定了手机号')
        vm.$storage.set('maskMobile', LOGIN_D.maskMobile)
        localStorage.setItem('maskMobile', LOGIN_D.maskMobile)
        vm.$sa.login(LOGIN_D.szMemberCode)
      } else if (backUrl) { // 未绑定手机号，并且配置了返回url，说明需要登录
        vm.$storage.set('maskMobile', '')
        localStorage.setItem('maskMobile', '')
        setCookie('maskMobile', '')
        vm.$router.push({
          name: 'login',
          query: {
            backUrl
          }
        })
        return
      } else {
        vm.$storage.set('maskMobile', '')
        localStorage.setItem('maskMobile', '')
        setCookie('maskMobile', '')
      }
      console.log('set成功')
      resolve()
    } catch (e) {
      vm.$storage.set('isLogin', false)
      vm.$storage.set('maskMobile', '')
      reject(e)
    }
  })
}


/**
 * 获取url参数
 * @param {String} name 键
 */
export function getQueryString(name) {
  let reg = `(^|&)${name}=([^&]*)(&|$)`
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 对象转查询字符串
 * @param {Object} obj 要转换的对象
 */
export function queryStringfy(obj, hasSpace = true) {
  let keys = Object.keys(obj);
  let str = '';

  keys.forEach(k => {
    if (!obj[k] && !(obj[k] === '')) return
    if (!obj[k] && !hasSpace) return
    str += `&${k}=${obj[k]}`;
  });

  return str.slice(1);
}

// 初始化state管理器（主要是为了防止刷新页面状态丢失）
export function initStoreState() {
  window.$storage.set('isLogin', getCookie('islogin') === '1')
  const maskMobile = getCookie('maskMobile') || localStorage.getItem('maskMobile')
  if (!maskMobile) {
    window.$storage.set('maskMobile', '')
  } else {
    window.$storage.set('maskMobile', maskMobile)
  }
  window.$storage.set('szMemberCode', localStorage.getItem('szMemberCode'))
}

// 初始化Hazel健康无保险
export function initInsuranceState() {
  const noInsurance = getQueryString('noInsurance') || sessionStorage.getItem('noInsurance')
  switch (noInsurance) {
    case '1':
      window.$storage.set('noInsurance', true)
      break
    default:
      window.$storage.set('noInsurance', false)
      break
  }
}

// 初始Hazel健康社

export function initClinicState() {
  const isClinic = getQueryString('isClinic') || sessionStorage.getItem('isClinic')
  switch (isClinic) {
    case '1':
      window.$storage.set('isClinic', true)
      break
    default:
      window.$storage.set('isClinic', false)
      break
  }
}

// 返回错误结果
export function createErrorRes() {
  return {
    data: {
      SZ_BODY: {

      },
      SZ_HEAD: {
        RESP_CODE: "S0001",
        RESP_MSG: "已登录，或者正在登录"
      }
    }
  }
}

// 获取随机字符串
export function getNonceStr(len = 16) {
  const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let nonceStr = '';
  for (let i = 0; i < len; i++) {
    nonceStr += str.charAt(Math.floor((Math.random() * str.length)));
  }
  return nonceStr;
}

// 创建一个节流函数 time ms内仅执行一次
export function throttle(fn, time) {
  let canRun = true
  return function() {
    const context = this
    const args = arguments
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(context, args)
      canRun = true
    }, time)
  }
}

// 创建一个防抖函数 delay ms内没有再次操作才会触发
export function debounce(fn, delay) {
  const timer = null
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay);
  }
}