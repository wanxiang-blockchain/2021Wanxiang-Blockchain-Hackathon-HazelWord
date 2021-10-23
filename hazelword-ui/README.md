# sz-html-tpl-vue

# 注意事项
- Sentry: sentry..me/
  - 首先要联系管理员在 Sentry 建好项目
- iconfont： 字体图标库
  - 每个项目都要单独建图标项目，联系管理员提前创建

> 由于后面的配置可能要在不同的平台配置，所以注意事项前置

# 新建项目修改
### 一、修改配置文件
.env.development 本地开发<br>
.env.production  生产环境<br>
.env.testing     开发、测试环境

需修改字段：
- VUE_APP_SENTRY_DSN=https://4b3b@sentry..me/xx   Sentry DSN: Sentry新建项目时会有，为空时不上报异常
- VUE_APP_SENTRY_ENV=test/prod    Sentry ENV: 当前上报异常所属环境
- VUE_APP_WX_SZPL=wap   SZPL: 表示Hazel内部哪一个项目，用于登录态校验
- VUE_APP_BASE_PATH=/tplxxx 
- VUE_APP_ASSETS_DIR=tplxxx_static
- VUE_APP_PLATFORM_NAME=  该字段主要用在接口请求中，不同的项目可能会有不同的配置

.sentryclirc  Sentry 核心配置，用于上传 sourceMap
- project=sz-html-activity-vue 仅需替换项目名（ Sentry 项目名），如项目名未替换，会导致无法匹配 sourceMap

package.json
- name: "sz-xxx" 仅需修改项目名

### 二、修改字体库
- 第一步：iconfont 新建字体库 -> 找王浩
- 第二步：替换 src/assetss/fonts/font.js (symbol 方式)
- 第三步：替换 src/scss/sz/_iconfont.scss (font-class 方式)

### 三、修改依赖库 src/module
- API 库，可能需要修改以下配置
  - VUE_APP_ALPAY_SZPL 支付宝 SZPL，主要用于后端校验登录态，通常项目在支付宝中使用时需要更改
  - VUE_APP_WX_SZPL 微信 SZPL，主要用于后端校验登录态，通常每个项目都要改
  - VUE_APP_PLATFORM_NAME 平台名称，需要与后端人员确定是否需要修改，默认为 
  - VUE_APP_API_URL PC 端请求地址，通常不需要调整
  - VUE_APP_API_MOBILE_URL 移动端端请求地址，通常不需要调整

> 通常我们不在这里新加接口，如果一定要加，请将接口加到 index.js 中

- DB 库，在组件中修改即可，注意仅需修改 CONFIG 中内容，其它内容禁止修改

- Store 简易状态管理, 无需配置（如需使用 VueX，自行调整）
- tools 部分工具函数，无需调整

### 四、路由配置
- 增加中间件概念，主要为前置中间件，参考 src/router/middleware 中内容自行尝试

### 五、监控配置
- 参考 [Sentry 接入教程](http://wiki..com/pages/viewpage.action?pageId=24381212)

### Project setup
```
npm install


### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```
