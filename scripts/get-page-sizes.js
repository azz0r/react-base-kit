import rp from 'request-promise'
import Bluebird from 'bluebird'
import chalk from 'chalk'
import bytesToSize from './bytes-to-size'

const log = console.log

function getPageSizes(collection) {
  let requests = [],
    results = []

  collection.map((product) => {
    requests.push(
      rp(
        {
          method: 'GET',
          uri: product.url,
        }
      )
    )
  })
  return Bluebird.all(requests)
    .then((results) => {
      results.forEach((result, key) => {
        collection[key].size = bytesToSize(result.length)
      })
      return collection
    })
    .catch((err) => {
      console.log(err)
    })
}

export default getPageSizes
