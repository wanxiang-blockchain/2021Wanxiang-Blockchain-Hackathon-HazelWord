/*
 * @Description: 在此输入描述
 * @Date: 2019-10-10 09:55:13
 * @Author: 郑道杨
 * @LastEditors: 郑道杨
 * @LastEditTime: 2019-11-04 12:00:18
 */
import axios from 'axios'
import Router from '@/router'
import qs from 'qs'
import { getCookie, isMobile } from '@/module/tools' // 导入工具包
import { Message } from 'view-design'

// 添加请求拦截器(由于axios默认发送application/json数据，现有后端不支持，所以在直接请求java接口时，需添加拦截器，处理数据后发送请求
// ) axios.interceptors.request.use((config) => {   // 在发送请求之前,格式化参数，增加token let
// data = config.data   if (data) {     config.data = urlEncode(data, true)  }
// return config }, (error) => {   return Promise.reject(error) })

const timeout = 30000 // 超时时间

class Base {
  /**
   * 构造器
   * @constructor
   * @param {object} [config={}] axios.create参数
   */
  constructor (config = {}) {
    this._http = axios.create(Object.assign({
      baseURL: this._getBaseURL(),
      timeout,
      withCredentials: true
    }, config))
    const defaults = this._defaultParams()
    this._http.interceptors.request.use((config) => {
      // 处理参数  添加默认参数
      if (config.method === 'post') {
        const data = qs.parse(config.data)
        config.data = qs.stringify({
          ...defaults,
          ...data
        })
        config.data = {
          ...defaults,
          ...data
        }
      } else if (config.method === 'get') {
        config.params = {
          ...defaults,
          ...config.params
        }
      }
      return config
    })
    this._http.interceptors.response.use(function (res) {
      // DEBUG 1 打开 0 关闭
      if (process.env.VUE_APP_DEBUG === '1') {
        const url = res.config.url
        console.log(url, res)
      }
      // 校验返回值结构
      if (typeof res.data !== 'object') {
        throw new Error('返回值格式不正确')
      }
      return res
    })
  }
  /**
   * 基础参数
   * @returns _t platformName szpl
   * @private
   */
  _defaultParams () {
    return {
      _t: new Date().getTime()
    }
  }

  /**
   * 获取基础URL
   * @returns {string}
   * @private
   */
  _getBaseURL () {
    const baseUrl = isMobile()
      ? process.env.VUE_APP_API_MOBILE_URL
      : process.env.VUE_APP_API_URL // 获取配置文件中的Url
    return baseUrl
  }
  /**
   * _handleNeedLoginResult 需要登录
   * 需要验证是否登录  未登录跳转登录页
   * @private
   */
  _handleNeedLoginResult (res) {
    if (['B0201', 'B0205', 'SE3006'].includes(res.data.SZ_HEAD.RESP_CODE)) {
      try {
        if (getCookie('islogin') === '1') {
          Message.info('登录过期，请重新登录')
        } else {
          Message.info('请先登录')
        }
        window.$storage.set('isLogin', false)
        window.$sa.__logout()
        Router.push({ name: 'login', query: { backUrl: location.href } })
        return
      } catch (e) {
        console.log(e)
      }
    } else {
      return this._handleResult(res)
    }
  }

  /**
   * _handleResult
   * 需要返回非0弹出toast
   * @private
   */
  _handleResult (res) {
    if (res.data && !~['S0000'].indexOf(res.data.SZ_HEAD.RESP_CODE)) {
      Message.info(res.data.SZ_HEAD.RESP_MSG)
    }
    return res.data
  }
  /**
   * GET请求
   * @param url
   * @param params
   * @returns {PromiseLike<T> | Promise<T>}
   */
  get (url, params = {}) {
    // axios.get('url' [, config])
    return this._http.get(url, { params })
  }

  /**
   * POST请求
   * @param url
   * @param params
   * @returns {PromiseLike<T> | Promise<T>}
   */
  post (url, params) {
    const data = {
      ...params,
      _csrf: getCookie('csrfToken')
    }
    // axios.post(url[, data[, config]])
    return this._http.post(url, data)
  }
}

export default Base
