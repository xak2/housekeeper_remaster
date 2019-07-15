import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { store } from './store'
import { Customizer, mergeStyles } from 'office-ui-fabric-react'
import { initializeIcons } from '@uifabric/icons'
import App from './components/App'
import Landing from './components/Landing'
import SignIn from './components/SignIn'
import './media/index.css'

initializeIcons();

mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#root)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
})

function PrivateRoute({ component: Component, ...rest }) {
  console.log(Component)
  return (
    <Route
      {...rest}
      render={props =>
        store.getState('status') ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
          )
      }
    />
  )
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <Customizer>
        <Route exact path="/" component={Landing} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/app" component={App} />
      </Customizer>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)