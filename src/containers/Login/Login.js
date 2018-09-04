import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { loginErrors } from '../../reducers/auth'
import { isAuthenticated } from '../../reducers/'
import { Redirect } from 'react-router'
import styled from 'styled-components'

const LoginBox = styled.div`
  border: 1px solid black;
  margin: 75px auto;
  text-align: center;
  width: 80%;
`

const LoginInput = styled.input`
  border: 1px solid black;
  height: 25px;
  margin-bottom: 10px;
  width: 80%;
`

const LoginButton = styled.button`
  border: 1px solid black;
  height: 25px;
  margin-bottom: 20px;
  padding: 1px;
  width: 80%;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

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
      <LoginBox>
        <h1>Log In</h1>
        {this.props.isAuthenticated ? 
          (<Redirect to="/"/>) : 
          <LoginForm onSubmit={this.handleSubmit}>
            <LoginInput placeholder="email" 
              name="email" 
              type="email"
              value={this.state.username} 
              onChange={this.handleChange}/>
            <LoginInput placeholder="password" 
              type="password" 
              name="password" 
              onChange={this.handleChange}/>
            <LoginButton onClick={this.handleSubmit}>Login</LoginButton>
          </LoginForm>
        }
      </LoginBox>
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