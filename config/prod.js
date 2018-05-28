/*
 * @Author: qiao 
 * @Date: 2018-05-25 14:16:46 
 * @Last Modified by: qiao
 * @Last Modified time: 2018-05-25 14:17:49
 * 生产环境
 */
const baseConfig = require('./base');

module.exports = Object.assign(baseConfig, {
  ENV: '"production"',
  NODE_ENV: '"production"', // 配置为 production 将会使Vue进入 生产模式，减少很多logger 
  DEBUG_MODE: true,
  API_KEY: '"XXXX-XXXXX-XXXX-XXXX"'
});
