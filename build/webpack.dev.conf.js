var path = require('path')

var webpack = require('webpack')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config/dev');
var baseWebpackConfig = require('./webpack.base.conf');

baseWebpackConfig.devtool = '#source-map',
baseWebpackConfig.plugins = [
  ...baseWebpackConfig.plugins,

  new webpack.NoEmitOnErrorsPlugin(),

  new FriendlyErrorsPlugin()
];

module.exports = baseWebpackConfig;