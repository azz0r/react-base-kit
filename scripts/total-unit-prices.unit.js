import totalUnitPrices from './total-unit-prices'
import faker from 'faker'
import { expect } from 'chai'

describe('totalUnitPrices', () => {
  let makeProduct = () => {
    return {
      unit_price: faker.commerce.price(1, 500, 2),
    }
  }
  const props = {
    collection: [makeProduct(), makeProduct(), makeProduct()]
  }
  const wrapper =
  it('it gets the right price', () => {
    expect(totalUnitPrices({...props})).to.equal(55)
  })
})
