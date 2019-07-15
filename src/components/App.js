import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import FancyRoute from '../tools/FancyRoute/FancyRoute'
import Landing from './Landing'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import NotFound from './NotFound'

class App extends Component {

  render() {
    let auth = this.props.user.authenticated
    if (auth === false) {
      return (
        <BrowserRouter>
          <Switch>
            <FancyRoute exact path="/" component={Landing} />
            <FancyRoute path="/signin" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      )
    } else {
      return (
        <BrowserRouter>
          <FancyRoute path="/signin" component={SignIn} />
          <FancyRoute path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/dashboard" />
        </BrowserRouter>
      )
    }
  }
}

const mapStateToProps = store => {
  return {
    user: store.userReducer.user
  }
}

export default connect(mapStateToProps)(App)