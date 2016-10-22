import chalk from 'chalk'
import jsonfile from 'jsonfile'

const log = console.log

function totalUnitPrices(collection) {
  return collection.reduce(function(previousValue, currentValue, currentIndex, array) {
    return previousValue + currentValue.unit_price;
  })
}

export default totalUnitPrices
