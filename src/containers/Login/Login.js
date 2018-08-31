import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { loginErrors } from '../../reducers/auth'
import { isAuthenticated } from '../../reducers/'
import { Redirect } from 'react-router'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }
  
  componentDidMount() {
    console.log(this.props.isAuthenticated)
    console.log(this.props)
    console.log(this)
  }
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value}, function() {})
  }
  
  handleSubmit = (event) => {
    this.props.onSubmit(this.state.email, this.state.password)
    event.preventDefault()
  }
  
  render() {
    return(
      <React.Fragment>
        {this.props.isAuthenticated ? 
          (<Redirect to="/"/>) : 
          <form onSubmit={this.handleSubmit}>
            <input placeholder="email" 
              name="email" 
              type="email"
              value={this.state.username} 
              onChange={this.handleChange}/>
            <input placeholder="password" 
              type="password" 
              name="password" 
              onChange={this.handleChange}/>
              <button onClick={this.handleSubmit}/>
          </form>
          }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: loginErrors(state),
  isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (email, password) => {
    dispatch(login(email, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)