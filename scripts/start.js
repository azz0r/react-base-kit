process.env.NODE_ENV = 'development'

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('../config/webpack.config.dev')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  hot: true, // Note: only CSS is currently hot reloaded
  quiet: true,
  devServer: {
    hot: true
  },
  colors: true,
  clientLogLevel: "error",
  watchOptions: {
    ignored: /node_modules/
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err)
  }

  console.log()
  console.log('Listening at http://localhost:3000/')
})
