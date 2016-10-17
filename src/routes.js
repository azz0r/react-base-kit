import React from 'react'
import { IndexRoute, Route } from 'react-router'

export default () => {
  return (
    <Route>
      <IndexRoute
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('./pages/foursquare').default);
          })
        }}
       />
      <Route path="about">
        <IndexRoute
          getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
              callback(null, require('./pages/about').default);
            })
          }}
        />
      </Route>
      <Route
        path="*"
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('./pages/foursquare').default);
          })
        }}
       />
    </Route>
  );
};
