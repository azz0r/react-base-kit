function getPriceFromString(unit) {
  return unit.match(/[\d\.\d]+/i)[0]
}

export default getPriceFromString
