import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, accessToken } from '../../reducers/'
import axios from 'axios'

class Team extends Component {
  
  componentDidMount () {
  
  }
    
  render () {
    return (
      <h1>This is my Team page!</h1>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
  token: accessToken(state)
})

export default connect(mapStateToProps, null)(Team)