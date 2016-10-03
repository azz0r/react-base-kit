import paths from '../src/paths';
import gaze from 'gaze';
import replace from 'replace';
import Promise from 'bluebird';

async function copy({ watch } = {}) {
  let ncp = Promise.promisify(require('ncp'));
  ncp.limit = 16;
  const DEV = !process.argv.includes('--release') && !process.argv.includes('--yorklab');

  await Promise.all([
    ncp(paths.appPublic, paths.appBuildPublic),
    ncp('package.json', `${paths.appBuild}/package.json`)
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false
  });

  if (watch) {
    const watcher = await new Promise((resolve, reject) => {
      gaze(`${paths.appContent}/**/*.*`, (err, val) => err ? reject(err) : resolve(val));
    });
    watcher.on('changed', async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/content/').length);
      await ncp(`${paths.appContent}/${relPath}`, `${paths.appBuild}/content/${relPath}`);
    });
  }
}

export default copy;
