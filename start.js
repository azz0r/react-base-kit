import request from "request"
import cheerio from "cheerio"
import chalk from 'chalk'
import jsonfile from 'jsonfile'


const url = "http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html"
const log = console.log;

request(url, (error, response, body) => {
  const $ = cheerio.load(body)

  if (!error) {
    log(chalk.bgGreen.black('No error receieved, processing body'))
    let
      titles = $(".productInfo a").text(),
      urls = $('.productInfo a').map(function(i, el) { return $(el).attr('href').trim() }).toArray(),
      unitPrices = $('.pricePerUnit').map(function(i, el) { return $(el).text().trim() }).toArray(),
      collection = []

      titles = titles.split('\n').filter((value) => {return value !== ""})

      titles.forEach((title, key) => {
        title = title.trim()
        let url =  urls[key]
        if (title > '' && url > '') {
          log(chalk.bgGreen.black(`Adding ${title} to the collection`))
          collection[key] = {
            title: title,
            url: url,
            unit_price: unitPrices[key] ? unitPrices[key] : 0
          }
        }
      })
      jsonfile.writeFile("data.json", collection.filter((product) => product.title), function (err) {
        if (err) {
          return log(chalk.red.inverse(`Failed to write data file: ${err}`))
        }
        log(chalk.bgGreen.black(`Data file written successfully`))
      })
      log(chalk.bgYellow.black(`Collection complete, listed below:`))
      log(chalk.bgWhite.black(collection))
  } else {
    log(chalk.red.inverse(`Failed to write data file ${err}`))
  }
})
