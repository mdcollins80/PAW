import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import Navbar from './components/NavBar/NavBar'
import PrivateRoute from './containers/PrivateRoute/PrivateRoute'
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import Picks from './containers/Picks/Picks'



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
          <PrivateRoute exact path="/my-picks" component={Picks} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </AppBody>
    );
  }
}

export default App;
