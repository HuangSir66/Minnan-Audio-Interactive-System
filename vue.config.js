const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin  = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
module.exports = defineConfig({
  publicPath:"./",
  transpileDependencies: true,
  lintOnSave:false,//关闭eslint校验
  // 配置跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://127.0.0.1:1104',
        changeOrigin:true
      }
    },
    client: {
      overlay: false
    },
    port:8392
  },
  configureWebpack: {
     plugins: [
     new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
    
            threshold: 10240, // 对超过10K的数据进行压缩
    
            minRatio: 0.8, // 极小比
            filename: '[path][base].gz'
      }),
    ]
  },
})
