import eruda from 'eruda' // 移动端调试工具
import erudaDom from 'eruda-dom'
import erudaFeatures from 'eruda-features'
import erudaTiming from 'eruda-timing'

let DebugPlugin = {}

DebugPlugin.install = _ => {
  if (process.env.VUE_APP_DEBUG === '1') { // 仅在开发、测试环境，打开工具
    eruda.init()
    eruda.add(erudaDom)
    eruda.add(erudaFeatures)
    eruda.add(erudaTiming)
  }
}

export default DebugPlugin
