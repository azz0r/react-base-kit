function totalUnitPrices(collection) {
  let returnTotal = collection.reduce((total, current) =>
    parseFloat(total) + parseFloat(current.unit_price)
  , 0)
  return returnTotal.toFixed(2)
}

export default totalUnitPrices
