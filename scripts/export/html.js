import 'ignore-styles'
import routesConfig from '../../src/routes'
import { getAllRoutes } from './routes'
import { fetchPage, writePage } from './static-builder'

const serverUrl = 'http://localhost:3000/'
const outDir = './build/'

function dumpHtml() {

  console.log('dumpHTML')

  return new Promise((resolve, reject) => {

    console.log('hit promise')

    if (!routesConfig().props.children) {
      console.log('dumped')
      return reject('No children routes to dump!')
    }

    console.log('Before Get All Routes')

    const allRoutes = getAllRoutes()

    console.log('After Get All Routes')

    Promise.all(allRoutes.map(function(route) {

      console.log('Building Route', route)

      return new Promise((resolve, reject) => {
        // Fetch page
        fetchPage(serverUrl, route).then(function(res) {
          // And then write it
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
      console.log('Completed static HTML dump:')

      console.log(allRoutes.sort().map((route) => `->  ${route}`).join('\n'))

      return resolve()
    }).catch(function(e) {
      
      console.log(e)

      return reject(e)
    })
  })
}

dumpHtml()
