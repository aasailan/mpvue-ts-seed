// require('./check-versions')()

var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')


const config = require('../config/dev');
process.env.NODE_ENV = JSON.parse(config.NODE_ENV);

// 引入webpack config，关键步骤
var webpackConfig = require('./webpack.dev.conf');
// console.log(JSON.stringify(webpackConfig));

// default port where dev server listens for incoming traffic
var port = config.port;

var app = express()
var compiler = webpack(webpackConfig)

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.proxyTable;
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve pure static assets
// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))
var staticPath = path.posix.join('/', 'static')
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

// 打开代理服务器
var server = app.listen(port, 'localhost')

// for 小程序的文件保存机制
require('webpack-dev-middleware-hard-disk')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

module.exports = {
  // ready返回一个 promise，并且永远不会resolve，可以让npm进程保持运行
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
