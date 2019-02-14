'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/yujing'),
        to: 'yujing',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/huanjing'),
        to: 'huanjing',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../static_resource/qihou'),
        to: 'qihou',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../static_resource/jigou'),
        to: 'jigou',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../static_resource/video'),
        to: 'video',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/360'),
        to: '360',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/plugin'),
        to: 'plugin',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/images'),
        to: 'images',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/pub'),
        to: 'pub',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/request_file'),
        to: 'request_file',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/warning'),
        to: 'warning',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../static_resource/map-source'),
        to: 'map-source',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../static_resource/dzzh'),
        to: 'dzzh',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../static_resource/dat'),
        to: 'dat',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/lib'),
        to: 'lib',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static_resource/tlnpdoc'),
        to: 'tlnpdoc',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../static_resource/lib2011'),
        to: 'lib2011',
        ignore: ['.*']
      }, {
        from: path.resolve(__dirname, '../static_resource/sample'),
        to: 'sample',
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
        // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})