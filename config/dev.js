/*
 * @Author: qiao 
 * @Date: 2018-05-24 11:29:30 
 * @Last Modified by: qiao
 * @Last Modified time: 2018-05-25 14:16:29
 * 开发环境配置
 */

const baseConfig = require('./base');

const devConfig = Object.assign(baseConfig, {
  ENV: '"development"',
  NODE_ENV: '"development"', // 配置为 production 将会使Vue进入 生产模式，减少很多logger 
  DEBUG_MODE: true,
  API_KEY: '"XXXX-XXXXX-XXXX-XXXX"', 

  port: 7100,
  proxyTable: {}
});

module.exports = devConfig;
