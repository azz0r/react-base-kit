import React from 'react'
import ReactDOM from 'react-dom'
import { context } from './components/context-holder/default'
import ContextHolder from './components/context-holder/context-holder'
import HmrContainer from './helpers/hrm-container'
import Head from './components/head/head'
import { Router, browserHistory } from 'react-router'
import routes from './routes'

const rootEl = document.getElementById('root')

export const Container = (
  <ContextHolder context={context}>
    <Router
      history={browserHistory}
      routes={routes()}
    />
  </ContextHolder>
)

try {
  ReactDOM.render(Container, rootEl)
  if (module.hot) {
    module.hot.accept('./components/app/app', () => {
      const NextApp = require('./components/app/app').default
      ReactDOM.render(
        <HmrContainer>
          <NextApp />
        </HmrContainer>,
        rootEl
      )
    })
  }
} catch (err) {
  console.log('Render error', err)
}
