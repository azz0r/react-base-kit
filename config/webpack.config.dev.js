var webpack = require('webpack')
var path = require('path')
var paths = require('./paths')
require('./environment')
const defaultConfig = require('./webpack.common')

const devConfig = Object.assign({}, defaultConfig, {
  devtool: "source-map",
  devServer: {
    contentBase: './dist/',
    hot: true,
    historyApiFallback: true
  },
  entry: {
    vendors: ['react', 'react-dom', 'lodash.debounce', 'react-helmet', 'react-router', 'superagent'],
    devServer: require.resolve('webpack-dev-server/client') + '?/',
    hot: require.resolve('webpack/hot/dev-server'),
    polyfills: require.resolve('./polyfills'),
    app: path.join(paths.appSrc, 'index'),
  },
  watch: true,
  stats: true,
  progress: true,
})
devConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
devConfig.module.loaders.push(
  {
    test: /\.scss$/,
    loader: 'style!css!postcss!sass?sourceMap',
  }
)
module.exports = devConfig
