import { getAllRoutes } from '../routes'
import { expect } from 'chai'

describe('Export routes', () => {
  it('should have more than one route', () => {
    let result = getAllRoutes()
    expect(result.length).to.be.above(1)
  })
})
