/*
 * @Date: 2020-04-03 02:28:30
 * @Author: 作者
 * @Param: [title] {String} - 参数说明
 * @Desc: 描述
 */
const CompressionPlugin = require('compression-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin({
//   outputFormat: 'human'
// })
// function smpWrap (config = {}) {
//   return smp.wrap(config)
// }

const path = require('path')

const plugins = [
  new StyleLintPlugin({
    files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    fix: true
  }),
  new ProgressBarPlugin(),
  // new HardSourceWebpackPlugin(),
  // 自动添加 DLL 库
  new AutoDllPlugin({
    inject: true, // will inject the DLL bundles to index.html
    filename: '[name].dll.js',
    // path: process.env.VUE_APP_ASSETS_DIR,
    entry: {
      vendor: [
        'axios',
        'core-js',
        'eruda',
        'eruda-dom',
        'eruda-features',
        'eruda-timing',
        'vue',
        'vue-router-multiguard',
        'vue-router',
        'vuex',
        'xss'
      ]
    }
  })
]
if (process.env.VUE_APP_DEBUG === '0') {
  plugins.push(new CompressionPlugin({
    test: /\.js$|\.html$|.\css/, // 匹配文件名
    threshold: 10240, // 对超过10k的数据压缩
    deleteOriginalAssets: false // 不删除源文件
  }))
}

const configureWebpack = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'styles': path.resolve(__dirname, './src/scss/')
    }
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  }
}

module.exports = {
  // configureWebpack: smpWrap(configureWebpack),
  configureWebpack,
  chainWebpack: config => {
    config.plugins.delete('prefetch')

    // eslint 保存时自动修复异常
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
  },
  publicPath: '/',
  outputDir: undefined,
  // assetsDir: process.env.VUE_APP_ASSETS_DIR,
  // assetsDir: 'static',
  runtimeCompiler: undefined,
  productionSourceMap: true,
  parallel: require('os').cpus().length > 1,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/vars.scss";`
      }
    }
  },
  devServer: {
    hot: true,
    proxy: {
      '^/v0': {
        target: 'http://8.210.116.104:9919',
        ws: true,
        changeOrigin: true
      }
    }
  },
  // devServer: {
  //   before: require('./mock'),
  //   disableHostCheck: true
  // },
  indexPath: 'index.html'
  // chainWebpack
}
