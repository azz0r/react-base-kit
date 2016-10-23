import writeFile from '../write-file'
import stub from './stub.json'
import { expect } from 'chai'
import fs from 'fs'

const dataPath = "./stub.json"

describe('writeFile', () => {
  const wrapper = writeFile(
    dataPath,
    stub
  )
  let tempJSON = require(dataPath)
  it('it writes a temp file', () => {
    expect(tempJSON).to.equal(stub)
    fs.unlinkSync(dataPath);
  })
})
