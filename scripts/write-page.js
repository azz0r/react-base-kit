import fs from 'fs'
import { mkdirP as mkdirPCallback } from 'mkdirp'
import url from 'url'
import path from 'path'
import denodeify from 'denodeify'
import { build, error } from '../config/log'

const mkdirP = denodeify(mkdirPCallback)
const writeFile = denodeify(fs.writeFile)

export function writePage(baseDir, [pageUrl, content]) {
  const pathname = url.parse(pageUrl).pathname,
    filename = path.join(baseDir, pathname, 'index.html')
  build(filename)

  return mkdirP(path.dirname(filename))
    .then(() => writeFile(filename, content))
    .then(() => filename)
}
