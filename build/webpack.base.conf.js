var path = require('path')
var fs = require('fs')
var glob = require('glob')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

var utils = require('./utils')
const config = process.env.NODE === 'production' ? require('../config/prod') : require('../config/dev');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function getEntry (rootSrc, pattern) {
  var files = glob.sync(path.resolve(rootSrc, pattern))
  return files.reduce((res, file) => {
    var info = path.parse(file)
    var key = info.dir.slice(rootSrc.length + 1) + '/' + info.name
    res[key] = path.resolve(file)
    return res
  }, {})
}

const appEntry = { app: resolve('./src/main.ts') }
const pagesEntry = getEntry(resolve('./src'), 'pages/**/main.ts')
const entry = Object.assign({}, appEntry, pagesEntry)

const cssSourceMap = process.env.NODE !== 'production';
// css基础loaders
const cssBaseLoaders = [
  {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE === 'production',
      sourceMap: cssSourceMap
    }
  },
  {
    loader: 'px2rpx-loader',
    options: {
      sourceMap: cssSourceMap
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: cssSourceMap
    }
  }
];

// const vueCssExtract = new ExtractTextPlugin({
//   filename: utils.assetsPath('css/[name].wxss'),
//   allChunks: true
// });
// const vueLessExtract = new ExtractTextPlugin({
//   filename: utils.assetsPath('css/[name].wxss'),
//   allChunks: true
// })
// const vueSassExtract = new ExtractTextPlugin({
//   filename: utils.assetsPath('css/[name].wxss'),
//   allChunks: true
// })

// const cssExtract = new ExtractTextPlugin({
//   filename: utils.assetsPath('css/[name].wxss'),
//   allChunks: true
// });
// const lessExtract = new ExtractTextPlugin({
//   filename: utils.assetsPath('css/[name].wxss'),
//   allChunks: true
// })
// const sassExtract = new ExtractTextPlugin({
//   filename: utils.assetsPath('css/[name].wxss'),
//   allChunks: true
// })

module.exports = {
  // 如果要自定义生成的 dist 目录里面的文件路径，
  // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
  // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
  entry: entry,

  target: require('mpvue-webpack-target'),

  output: {
    // 编译输出 ./dist
    path: config.assetsRoot,
    // 输出js chunk文件路径： './dist/static/js/[name].js'
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts',],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src'),
      'debug': resolve('src/utils/debug'),
    }
    // symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: {
          loaders: {
            'css': ExtractTextPlugin.extract({
              use: cssBaseLoaders,
              fallback: 'vue-style-loader'
            }),
            'less': ExtractTextPlugin.extract({
              use: cssBaseLoaders.concat({
                loader: 'less-loader',
                options: {
                  sourceMap: cssSourceMap
                }
              }),
            }),
            'scss': ExtractTextPlugin.extract({
              use: cssBaseLoaders.concat({
                loader: 'sass-loader',
                options: {
                  sourceMap: cssSourceMap
                }
              })
            }),
            'ts': [
              {
                loader: 'awesome-typescript-loader',
                options: {
                  useCache: true
                }
              }
            ]
          },

          // mpvue-loader 选项
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      /*********************** js ts文件 ********************* */
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          // 'babel-loader',
          {
            loader: 'mpvue-loader',
            options: {
              checkMPEntry: true
            }
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              // errorsAsWarnings: true,
              useCache: true,
            }
          }
        ]
      },

      {
        test: /\.js$/,
        // include: [resolve('src'), resolve('test')],
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: {
              checkMPEntry: true
            }
          },
        ]
      },

      /*********************** css 文件 ************************* */
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",

          use: cssBaseLoaders
        })
      },

      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",

          use: cssBaseLoaders.concat({
            loader: 'less-loader'
            // sourceMap: cssSourceMap
          })
        })
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",

          use: cssBaseLoaders.concat({
            loader: 'sass-loader'
            // sourceMap: cssSourceMap
          })
        })
      },

      /************************ 以下是各种静态文件 ********************* */
      /**
       * url-loader内置了file-loader。当文件大小超过limit的时候，默认调用内置的
       * file-loader来加载文件
       */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10kb的文件编译成base64编码
          limit: 10000,
          // 输出路径 './dist/static/img/[name].[ext]'
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      // 难道这些格式的文件也可以搞成base64编码？？
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // 输出路径 './dist/static/media/[name].[ext]'
          name: utils.assetsPath('media/[name]].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // 输出路径 './dist/static/fonts/[name].[ext]'
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.ENV
    }),

    /**
     * 把css抽离出形成wxss文件
     * './dist/static/css/[name].wxss'
     */
    // vueCssExtract,
    // vueLessExtract,
    // vueSassExtract,
    // cssExtract,
    // lessExtract,
    // sassExtract,
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].wxss'),
      allChunks: true
    }),
    
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

     // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        )
      }
    }),
    
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    // 将 ./static文件夹内的内容copy到./dist/
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
}
