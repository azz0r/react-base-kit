import ReduxThunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { setCompareReducer } from './reducers/compare.reducer';

export function getStore(server = false) {
  let storeEnhancer;

  if (server) {
    storeEnhancer = compose(applyMiddleware(ReduxThunk));
  } else {
    storeEnhancer = compose(
      applyMiddleware(ReduxThunk),
      persistState(),
      // chrome debugger
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f
    );
  }

  const combinedReducers = combineReducers({
    setCompareReducer: setCompareReducer
  });

  return createStore(combinedReducers, storeEnhancer);
}
