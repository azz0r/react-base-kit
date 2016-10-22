import request from "request"
import cheerio from "cheerio"
import chalk from 'chalk'

const url = "http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html"
const log = console.log;

request(url, (error, response, body) => {
  const $ = cheerio.load(body)

  if (!error) {
    log(chalk.blue.bgWhite('No error receieved, processing body'))
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
          log(chalk.green.inverse(`Adding ${title} to the collection`))
          collection[key] = {
            title: title,
            url: url,
            unit_price: unitPrices[key] ? unitPrices[key] : 0
          }
        }
      })
      log(chalk.yellow.inverse(`Collection complete, listed below:`))
    console.log(collection)
  } else {
    console.log("We’ve encountered an error: " + error)
  }
})
