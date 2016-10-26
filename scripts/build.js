process.env.NODE_ENV = 'production'

import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import filesize from 'filesize'
import { sync as gzipSize } from 'gzip-size'
import { sync as rimrafSync } from 'rimraf'
import webpack from 'webpack'
import config from '../config/webpack.config.prod'
import paths from '../config/paths'
import { log, error, exit, build } from '../config/log'

build('Emptying build directory')
rimrafSync(paths.appBuild + '/*')

build('Creating an optimized production build')
webpack(config).run(function(err, stats) {
  if (err) {
    error('Failed to create a production build')
    error(err.message || err)
    process.exit(1)
  }

  build(chalk.green('Compiled successfully.'))
  build('File sizes after gzip:')

  var assets = stats.toJson().assets
    .filter(asset => /\.(js|css)$/.test(asset.name))
    .map(asset => {
      var fileContents = fs.readFileSync(paths.appBuild + '/' + asset.name)
      var size = gzipSize(fileContents)
      return {
        folder: path.join('build', path.dirname(asset.name)),
        name: path.basename(asset.name),
        size: size,
        sizeLabel: filesize(size),
      }
    })
  assets.sort((a, b) => b.size - a.size)

  var longestSizeLabelLength = Math.max.apply(null,
    assets.map(a => a.sizeLabel.length)
  )
  assets.forEach(asset => {
    var sizeLabel = asset.sizeLabel
    if (sizeLabel.length < longestSizeLabelLength) {
      var rightPadding = ' '.repeat(longestSizeLabelLength - sizeLabel.length)
      sizeLabel += rightPadding
    }
    build(
      chalk.green(sizeLabel) +
      '  ' + chalk.dim(asset.folder + path.sep) +
      chalk.cyan(asset.name)
    )
  })

  // dumpHtml()

  build(chalk.green('Build production completed'))
  build(chalk.italic(paths.appBuild + '/*'))
  process.on('exit', (code) => {
    exit('closing')
  })
  process.exit()
})
