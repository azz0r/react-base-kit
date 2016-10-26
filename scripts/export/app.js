/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import run from '../run';
import clean from '../clean';
import copy from '../copy';
import bundle from '../bundle';
import dumpHtml from './html';
import cp from 'child_process';

/**
 * Exports the app in a "ready to upload" production state
 * Usage flags:
 * 	 `-- --release`
 * 	 `-- --yorklab`
 */
async function exportApp() {
  let server = null;

  // Clean, Copy and Bundle
  // Just the regular stuff!
  await run(clean);
  await run(copy);
  await run(bundle);

  // Run the server.js Bundle Server built previously
  await run(function startBundleServer() {
    return new Promise(resolve => {
      server = cp.spawn('node', ['./build/server.js'], {
        env: process.env,
        silent: false,
      });

      server.stdout.on('data', function(data) {
        console.log(data.toString('utf8'));

        resolve();
      });
    });
  });

  // Call the html script to fetch and save
  // app routes to static HTML pages
  await run(dumpHtml).then(function() {
    // In the end, we want to halt the server
    server.stdin.pause();
    server.kill();
  });
}

export default exportApp;
