// 引入外部资源
const fs = require('fs')                        
const path = require('path')
 
module.exports = {
    // 用于被index.js进行调用
    getJsonFile (filePath) {
        // 读取指定的json文件
        const json = fs.readFileSync(path.resolve(__dirname, `json/${filePath}`), 'utf-8')
        // 解析并返回
        return JSON.parse(json)
    }
}