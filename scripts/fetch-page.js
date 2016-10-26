import request from 'superagent'
import { build, error } from '../config/log'

export function fetchPage(host, pagePath) {
  return new Promise(function(resolve, reject) {
    const pageUrl = host + pagePath
    build(`Fetching ${pageUrl}`)

    request.get(pageUrl)
      .accept('text/html')
      .end(function(err, res) {
        if (err) {
          return reject(err)
        }

        if (res.ok) {
          resolve([
            pageUrl,
            res.text,
          ])
        } else {
          error(`Couldnt fetch ${pageUrl}`)
          reject([
            pageUrl,
            res.text,
          ])
        }
    })
  })
}
