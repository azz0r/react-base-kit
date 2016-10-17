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
    root: resolveApp('root'),
  },
  appBuild: resolveApp('build'),
  appHtml: resolveApp('index.html'),
  appImgs: resolveApp('src/imgs'),
  appStylesheets: resolveApp('src/stylesheets'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
};
