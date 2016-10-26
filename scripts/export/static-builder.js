import request from 'superagent';
import fs from 'fs';
import { mkdirP as mkdirPCallback } from 'mkdirp';
import url from 'url';
import path from 'path';
import denodeify from 'denodeify';

const mkdirP = denodeify(mkdirPCallback),
  writeFile = denodeify(fs.writeFile);

export function fetchPage(host, pagePath) {
  return new Promise(function(resolve, reject) {
    const pageUrl = host + pagePath;

    request.get(pageUrl).accept('text/html').end(function(err, res) {
      if (err) {
        return reject(err);
      }

      if (res.ok) {
        resolve([pageUrl, res.text]);
      } else {
        reject([pageUrl, res.text]);
      }
    });
  });
}

export function writePage(baseDir, [pageUrl, content]) {
  const pathname = url.parse(pageUrl).pathname,
    filename = path.join(baseDir, pathname, 'index.html');

  return mkdirP(path.dirname(filename))
    .then(() => writeFile(filename, content))
    .then(() => filename);
}
