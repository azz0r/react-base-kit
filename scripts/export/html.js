import 'babel-loader'
import 'ignore-styles'
import routesConfig from '../../src/routes'
import { getAllRoutes } from './routes'
import { fetchPage, writePage } from './static-builder'

const serverUrl = 'http://localhost:3000/',
  outDir = './build/'

async function dumpHtml() {
  return new Promise((resolve, reject) => {
    if (!routesConfig().props.children) {
      return reject('No children routes to dump!')
    }

    // Get static routes
    let allRoutes = getAllRoutes()

    Promise.all(allRoutes.map(function(route) {
      console.log('building route: ', route)
      return new Promise((resolve, reject) => {
        // Fetch page
        fetchPage(serverUrl, route).then(function(res) {
          // And then write it
          writePage(outDir, [route, res[1]])
        }).then(function() {
          resolve()
        }).catch(function(e) {
          reject(e)
        })
      })
    })).then(function() {
      console.log('Completed static HTML dump:')
      console.log(allRoutes.sort().map((route) => `->  ${route}`).join('\n'))
      return resolve()
    }).catch(function(e) {
      console.log(e)
      return reject(e)
    })
  })
}

export default dumpHtml
