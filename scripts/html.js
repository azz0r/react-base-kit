import 'ignore-styles'
import routesConfig from '../src/routes'
import { fetchPage } from './fetch-page'
import { writePage } from './write-page'
import { build, error } from '../config/log'

const serverUrl = 'http://localhost:3000/'
const outDir = './build/'
const allRoutes = ['/', '/about']

function dumpHtml() {
  build(`Building ${allRoutes.length} routes`)
  return new Promise((resolve, reject) => {
    Promise.all(allRoutes.map(function(route) {

      build(`Building Route: ${route}`)

      return new Promise((resolve, reject) => {
        // Fetch page
        fetchPage(serverUrl, route).then(function(res) {

          build(`Writing to ${outDir}`)
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
      build('Completed static HTML dump:')

      build(allRoutes.sort().map((route) => `->  ${route}`).join('\n'))

      return resolve()
    }).catch(function(e) {

      build(e)

      return reject(e)
    })
  })
}

export default dumpHtml
