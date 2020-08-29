const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 修改 src 为 examples
  pages: {
    index: 'examples/main.js'
  },

  // 项目部署的基础路径
  publicPath: isProd ? './' : '/',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  lintOnSave: !isProd,

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  transpileDependencies: ['vue-echarts', 'resize-detector'],

  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          '@': resolve('examples'),
          api: '@/api',
          assets: '@/assets',
          components: '@/components',
          plugins: '@/plugins',
          store: '@/store',
          utils: '@/utils',
          views: '@/views',
          packages: resolve('packages')
        }
      }
    }
  },

  // 配置 webpack-dev-server 行为
  devServer: {
    host: '0.0.0.0',
    hot: true,
    hotOnly: false,
    open: true,
    openPage: '',
    port: 8080,
    https: false,
    progress: true
  }
}
