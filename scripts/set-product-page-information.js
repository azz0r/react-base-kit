import rp from "request-promise"
import Bluebird from "bluebird"
import chalk from "chalk"
import bytesToSize from "./bytes-to-size"
import cheerio from "cheerio"

const log = console.log

function setProductPageInformation(collection) {
  let requests = [],
    results = []

  collection.map((product) => {
    requests.push(
      rp(
        {
          method: "GET",
          uri: product.url,
        }
      )
    )
    log(
      chalk.bgYellow.black.bold("Queued fetch for: "),
      chalk.bgYellow.black(product.url)
    )
  })
  return Bluebird.all(requests)
    .then((results) => {
      results.forEach((result, key) => {
        let $ = cheerio.load(result)
        collection[key].description = $(".productText p").first().text()
        collection[key].size = bytesToSize(result.length)
      })
      log(chalk.bgGreen.bold("Queued product pages complete"))
      return collection
    })
    .catch((err) => {
      console.log(err)
    })
}

export default setProductPageInformation
