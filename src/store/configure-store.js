import reducers from '../reducers'
import persistState from 'redux-localstorage'
import reduxReset from 'redux-reset'
import { createStore, applyMiddleware, compose } from 'redux'

const storeEnhancer = compose(
  applyMiddleware(),
  persistState(),
  reduxReset(),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f
);

export default (initialState) => {
  return createStore(reducers, initialState, storeEnhancer);
};
