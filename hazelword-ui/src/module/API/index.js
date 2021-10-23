/*
 * @Description: 业务API类，继承了基础API类
 * @Date: 2019-05-30 20:54:22
 * @Author: 郑道杨
 * @LastEditors: 郑道杨
 * @LastEditTime: 2019-11-05 09:06:53
 */

import Base from './base'
import axios from 'axios'

/* eslint-disable no-unused-vars */
function mock (path) {
  function wrapper (target, name, descriptor) {
    if (process.env.NODE_ENV === 'development') {
      descriptor.value = function (...args) {
        console.log(`Mock: ${path}, Env: ${process.env.NODE_ENV}, Path: ${path}`)
        try {
          return axios.get(`http://${window.location.host}/mocks/${path}`, ...args).then(resp => {
            return resp.data
          })
        } catch (e) {
          console.log(`Error: ${e}`)
          throw e
        }
      }
    }
    return descriptor
  }
  return wrapper
}
/* eslint-enable no-unused-vars */
class Api extends Base {
  // 接口mock
  @mock('config.json')
  getConfig (data) {
    return this.slget('config', data)
  }

  // 查询 K 线图
  queryKLine (data) {
    return this.get('/v0/api/hzl/kline', data)
  }

  // 查询 K 线图
  queryAssetsData (data) {
    return this.get('/v0/api/hzl/detail', data)
  }
}

export default Api
