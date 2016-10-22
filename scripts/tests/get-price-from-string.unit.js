import { expect } from 'chai'
import getPriceFromString from '../get-price-from-string.js'

const stub = "£3.50/unit"
const stubResult = "3.50"

describe('getPriceFromString', () => {
  it('it gets the right price', () => {
    expect(getPriceFromString(stub)).to.equal(stubResult)
  })
})
