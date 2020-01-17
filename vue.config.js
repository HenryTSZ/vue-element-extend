module.exports = {
  // 项目部署的基础路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  transpileDependencies: ['vue-echarts', 'resize-detector'],

  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          api: '@/api',
          assets: '@/assets',
          components: '@/components',
          plugins: '@/plugins',
          store: '@/store',
          utils: '@/utils',
          views: '@/views'
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
