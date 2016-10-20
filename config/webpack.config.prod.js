const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const defaultConfig = require('./webpack.common')
const path = require('path')
const paths = require('./paths')
const HTMLMinifier = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  minifyJS: true,
  minifyCSS: true,
}

const prodConfig = Object.assign({}, defaultConfig, {
  devtool: false,
  entry: {
    vendors: ['react', 'react-dom', 'lodash.debounce', 'react-helmet', 'react-router', 'superagent'],
    polyfill: require.resolve('./polyfills'),
    app: path.join(paths.appSrc, 'index'),
  },
  output: {
    publicPath: "https://azz0r.github.io/react-base-kit/",
    path: paths.appBuild,
    filename: "static/js/[name].[hash:8].bundle.js",
    chunkFilename: "static/js/[id].[hash:8].chunk.js",
  }
})

prodConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: true,
  })
)
prodConfig.plugins.push(
  new ExtractTextPlugin('static/css/[name].[hash:8].css')
)
prodConfig.plugins.push(
  new HtmlWebpackPlugin({
    template: paths.appHtml,
    minify: HTMLMinifier,
  })
)
prodConfig.module.loaders.push(
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?sourceMap'),
  }
)

module.exports = prodConfig
