import run from '../run'
import clean from '../clean'
import copy from '../copy'
import bundle from '../bundle'
import dumpHtml from './html'
import cp from 'child_process'

async function exportApp() {
  let server = null

  await run(() => {
    return new Promise(resolve => {
      server = cp.spawn('node', ['./build/server.js'], {
        env: process.env,
        silent: false,
      })
      server.stdout.on('data', function(data) {
        console.log(data.toString('utf8'))
        resolve()
      })
    })
  })

  // Call the html script to fetch and save
  // app routes to static HTML pages
  await run(dumpHtml).then(function() {
    // In the end, we want to halt the server
    server.stdin.pause()
    server.kill()
  })
}

export default exportApp
