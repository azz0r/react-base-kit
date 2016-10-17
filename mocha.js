/*
WIP
*/
var Mocha = require('mocha'),
  fs = require('fs'),
  Glob = require('glob'),
  path = require('path')

// Instantiate a Mocha instance.
var mocha = new Mocha({
    ui: 'tdd',
    reporter: 'mock-local-storage'
})

const globPatterns = {
  unit: 'src/**/*.spec.js',
}

let pattern = Object.keys(globPatterns).map((n) => globPatterns[n])

Glob(
  pattern.length > 1 ? `{${pattern.join(',')}}` : pattern[0],
  {},
  (err, files) => {
    files.forEach((file) => mocha.addFile(file))
    mocha.run((failures) => {
      process.on('exit', () => {
        process.exit(failures)
      })
    })
  }
)
