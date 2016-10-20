import _flattenDeep from 'lodash/flattenDeep'
import _uniq from 'lodash/uniq'
import routesConfig from '../../src/routes'

export function getAllRoutes() {
  return getStaticPathsFromRoutes(routesConfig().props.children)
}

function normalizeFolderPath(path) {
  return path.replace('/', '').concat('/')
}

export function getStaticPathsFromRoutes(routes, parentPath = '') {
  let staticRoutes = []

  parentPath = parentPath || ''

  routes.forEach((route) => {
    let routeProps = route.props,
      routePropsPath = routeProps.path,
      routePropsChildren = routeProps.children

    if (routePropsPath && routePropsPath.length > 1) {
      // Replace dynamic and static ref params
      const normalizedPath = routePropsPath.replace(/(\(?\/:\w.+[\)\/]?)/g, '')

      staticRoutes.push(parentPath + normalizedPath)
    }

    // Parent route with children
    if (routePropsChildren && routePropsPath) {
      let
        thisParentPath = (routePropsPath.length > 1)
          ? normalizeFolderPath(routePropsPath)
          : null,
        finalParentPath = (parentPath) ? parentPath + thisParentPath : thisParentPath
      staticRoutes.push(getStaticPathsFromRoutes(routePropsChildren, finalParentPath))
    }
  })

  // Return a flattened, unique items array
  return _uniq(
    _flattenDeep(staticRoutes)
  )
}
