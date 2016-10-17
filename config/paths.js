var path = require('path');

function resolveApp(relativePath) {
  return path.resolve(relativePath);
}

// after eject: we're in ./config/
module.exports = {
  app: {
    root: resolveApp('src'),
    actions: resolveApp('src/actions'),
    helpers: resolveApp('src/helpers'),
    pages: resolveApp('src/pages'),
    images: resolveApp('src/imgs'),
    reducers: resolveApp('src/reducers'),
    store: resolveApp('src/store'),
    stylesheets: resolveApp('src/stylesheets'),
    indexHtml: resolveApp('index.html'),
    routes: resolveApp('src/routes'),
    packageJson: resolveApp('package.json'),
    nodeModules: resolveApp('node_modules')
  },
  build: {
    root: resolveApp('build'),
  },
}
