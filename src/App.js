import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import PrivateRoute from './containers/PrivateRoute/PrivateRoute'
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'
import Navbar from './components/NavBar/NavBar'


const AppBody = styled.div`
  padding-top: 75px;
`


class App extends Component {
  
  render() {
    return (
      <AppBody className="App">
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </AppBody>
    );
  }
}

export default App;
