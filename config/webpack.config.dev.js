require('./environment')
const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const defaultConfig = require('./webpack.common')
const WebpackOnBuildPlugin = require('on-build-webpack');
const opn = require('opn')
const DEFAULT_PORT = process.env.PORT || 3000

const devConfig = Object.assign({}, defaultConfig, {
  devtool: "source-map",
  devServer: {
    contentBase: './build/',
    hot: true,
    historyApiFallback: true
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    require.resolve('./polyfills'),
    path.join(paths.appSrc, 'index'),
  ],
  watch: true,
  progress: true,
})
devConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
devConfig.plugins.push(
  new HtmlWebpackPlugin({
    inject: true,
    template: paths.appHtml,
  })
)
devConfig.plugins.push(
  new WebpackOnBuildPlugin(function() {
    opn('http://localhost:' + DEFAULT_PORT + '/')
  })
)
devConfig.module.loaders.push(
  {
    test: /\.scss$/,
    loader: 'style!css!postcss!sass?sourceMap',
  }
)
module.exports = devConfig
