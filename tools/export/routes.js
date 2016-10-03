import _flattenDeep from 'lodash/flattenDeep';
import _uniq from 'lodash/uniq';

export function getStaticPathsFromRoutes(routes, parentPath = '') {
  let staticRoutes = [];

  parentPath = parentPath || '';

  routes.forEach((route) => {
    let routeProps = route.props,
      routePropsPath = routeProps.path,
      routePropsChildren = routeProps.children;

    // Simple route
    // Only add if length > 1
    if (routePropsPath && routePropsPath.length > 1) {
      // Replace dynamic and static ref params
      const normalizedPath = routePropsPath.replace(/(\(?\/:\w.+[\)\/]?)/g, '');

      let finalPath = parentPath + normalizedPath;

      staticRoutes.push(finalPath);
    }

    // Parent route with children
    if (routePropsChildren && routePropsPath) {
      let thisParentPath = (routePropsPath.length > 1) ? normalizeFolderPath(routePropsPath) : null,
        finalParentPath = (parentPath) ? parentPath + thisParentPath : thisParentPath;

      staticRoutes.push(getStaticPathsFromRoutes(routePropsChildren, finalParentPath));
    }
  });

  // Return a flattened, unique items array
  return _uniq(
    _flattenDeep(staticRoutes)
  );
}

export function getAllRoutes() {
  return getStaticPathsFromRoutes(routesConfig().props.children);
}

function normalizeFolderPath(path) {
  return path.replace('/', '').concat('/');
}
