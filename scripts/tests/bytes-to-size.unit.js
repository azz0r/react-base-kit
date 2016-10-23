import { expect } from 'chai'
import bytesToSize from '../bytes-to-size'

const stubs = {
  kb: {amount: 34000, output: "33 KB"},
  mb: {amount: 3040000, output: "3 MB"},
  gb: {amount: 3040000000, output: "3 GB"},
}

describe('bytesToSize', () => {
  it('it gets the right kb size', () => {
    expect(bytesToSize(stubs.kb.amount)).to.equal(stubs.kb.output)
  })
  it('it gets the right mb size', () => {
    expect(bytesToSize(stubs.mb.amount)).to.equal(stubs.mb.output)
  })
  it('it gets the right gb size', () => {
    expect(bytesToSize(stubs.gb.amount)).to.equal(stubs.gb.output)
  })
})
