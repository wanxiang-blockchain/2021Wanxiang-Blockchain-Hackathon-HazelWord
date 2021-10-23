const Mock = require('mockjs')
const util = require('./util')
 
module.exports = function(app) {
    // 监听请求
  app.use('/mocks', (rep, res) => {
      // 响应时，返回 mock data的json数据
      const data = util.getJsonFile(rep.path)
      // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
      res.send(Mock.mock(data))
  })
}