import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import './App.css';

import PrivateRoute from './containers/PrivateRoute/PrivateRoute'
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'


class App extends Component {
  state = {
    teams: []
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pick a Winner</h1>
        </header>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
