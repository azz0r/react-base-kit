import 'ignore-styles'
import routesConfig from '../src/routes'
import { fetchPage } from './fetch-page'
import { writePage } from './write-page'
import { build, error } from '../config/log'

const serverUrl = 'http://localhost:3000'
const outDir = './build/'
const allRoutes = ['/', '/about']

function dumpHtml(resolve, reject) {
  build(`Building ${allRoutes.length} routes`)
  return new Promise((resolve, reject) => {
    Promise.all(allRoutes.map(function(route) {
      build(`Building Route: ${route}`)

      return new Promise((resolve, reject) => {
        fetchPage(serverUrl, route).then(function(res) {
          writePage(
            outDir,
            [
              route,
              res[1],
            ],
          )
        }).then(function() {
          resolve()
        }).catch(function(e) {
          reject(e)
        })
      })
    })).then(function() {
      return resolve()
    }).catch(function(e) {
      error(e)
      return reject(e)
    })
  })
}

dumpHtml()
