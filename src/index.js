import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { context } from './components/context-holder/default'
import ContextHolder from './components/context-holder/context-holder'
import routes from './routes'
import configureStore from './store/configure-store'

const store = configureStore()
const rootEl = document.getElementById('root')

export const Container = (
  <Provider store={store}>
    <ContextHolder context={context}>
      <Router
        history={browserHistory}
        routes={routes()}
      />
    </ContextHolder>
  </Provider>
)

try {
  ReactDOM.render(Container, rootEl)
  if (module.hot) {
    module.hot.accept('./components/page/page', () => {
      const NextApp = require('./components/page/page').default
      ReactDOM.render(
        <NextApp />,
        rootEl
      )
    })
  }
} catch (err) {
  console.log('Render error', err)
}
