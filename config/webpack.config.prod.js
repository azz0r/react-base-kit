const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const defaultConfig = require('./webpack.common')
const path = require('path')
const paths = require('./paths')

const prodConfig = Object.assign({}, defaultConfig, {
  devtool: false,
  entry: {
    vendors: ['react', 'react-dom', 'lodash.debounce', 'react-helmet', 'react-router', 'superagent'],
    polyfill: require.resolve('./polyfills'),
    app: path.join(paths.appSrc, 'index'),
  }
})

prodConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: true,
  })
)

prodConfig.module.loaders.push(
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?sourceMap'),
  }
)

module.exports = prodConfig
