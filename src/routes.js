import React from 'react'
import App from './components/app/app'
import { IndexRoute, Route } from 'react-router'

export default () => {
  return (
    <Route>
      <Route
        path="/"
        component={App}>
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
