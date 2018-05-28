var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var baseWebpackConfig = require('./webpack.base.conf')

baseWebpackConfig.devtool = 'source-map';
baseWebpackConfig.plugins = [
  ...baseWebpackConfig.plugins,
  new webpack.optimize.UglifyJsPlugin({
    test: /.js$/,
  
    compress: {
      // 删除 debugger 语句
      drop_debugger: true,
      // 删除console 语句
      drop_console: true,
      // 去除vuejs中的警告
      warnings: false
    },
  
    // include 可以通过 正则表达式来指定 匹配的文件夹路径 
    // include: /\.js$/,
  
    // 在使用UglifyJsPlugin插件的情况下，如果不设置这个属性，则不会进行source-map，即使设置了devtool 属性也没有用
    sourceMap: true
  }),

  // keep module.id stable when vender modules does not change
  new webpack.HashedModuleIdsPlugin(),

  new BundleAnalyzerPlugin({
    /**
     * 分析模式：使用默认的server模式，分析后自动打开一个server，提供分析结果页面
     * 'static' 模式，会生成一个静态html页面来提供分析结果
     */
    // analyzerMode: 'server',
    analyzerMode: 'static',
    /**
     * server模式下，主机地址
     */
    // analyzerHost: '127.0.0.1',
    /**
     * server模式下，端口地址
     */ 
    // analyzerPort: 8888,
    /**
     * 在static模式下，定义输出的html文件名。文件会被输出到 bundle的输出文件夹下
     */
    reportFilename: 'report.html'
  })
];

module.exports = baseWebpackConfig;
