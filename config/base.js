
var path = require('path');

module.exports = {
  ENV: '"development"',
  NODE_ENV: '"development"',
  DEBUG_MODE: true,
  API_KEY: '"XXXX-XXXXX-XXXX-XXXX"', 

  // 编译输出文件夹的绝对路径
  assetsRoot: path.resolve(__dirname, '../dist'),
  // 静态文件文件夹
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
}
