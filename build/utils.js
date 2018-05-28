/*
 * @Author: qiao 
 * @Date: 2018-05-24 11:54:25 
 * @Last Modified by: qiao
 * @Last Modified time: 2018-05-25 15:32:56
 */
var path = require('path')
const devConfig = require('../config/dev');
const prodConfig = require('../config/prod');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? devConfig.assetsSubDirectory
    : prodConfig.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}