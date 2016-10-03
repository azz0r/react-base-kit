import React from 'react';
import UI from './pages/ui';
import App from './components/app';
import { IndexRoute, Route } from 'react-router';

export default () => {
  return (
    <Route>
      <Route path="/" component={App} >
        <IndexRoute component={UI} />
      </Route>
      <Route path="*" component={UI} />
    </Route>
  );
};
