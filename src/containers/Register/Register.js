import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import { registerErrors } from '../../reducers/auth'
import { isAuthenticated } from '../../reducers/'
import { Redirect } from 'react-router'
import styled from 'styled-components'

const RegisterBox = styled.div`
  border: 1px solid black;
  margin: 75px auto;
  text-align: center;
  width: 90%;
`

const RegisterInput = styled.input`
  border: 1px solid black;
  height: 25px;
  margin-bottom: 10px;
  width: 80%;
`

const RegisterButton = styled.button`
  border: 1px solid black;
  height: 25px;
  margin-bottom: 20px;
  padding: 1px;
  width: 80%;
`

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginLink = styled.a`
  display: block;
  margin-bottom: 20px;
  text-decoration: none;
`

class Register extends Component {
  state = {
    email: '',
    password1: '',
    password2: ''
  }
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value}, function() {})
  }
  
  handleSubmit = (event) => {
    if (this.state.password1 === this.state.password2) {
      this.props.onSubmit(this.state.email, this.state.password1, this.state.password2)
      event.preventDefault()
    } else {
      alert("Passwords don't match!")
      event.preventDefault()
    }
  }
  
  render() {
    return(
      <RegisterBox>
        <h1>Register</h1>
        {this.props.isAuthenticated ? 
          (<Redirect to="/"/>) : 
          <RegisterForm onSubmit={this.handleSubmit}>
            <RegisterInput placeholder="email" 
              name="email" 
              type="email"
              value={this.state.username} 
              onChange={this.handleChange}/>
            <RegisterInput placeholder="password" 
              type="password" 
              name="password1" 
              onChange={this.handleChange}/>
            <RegisterInput placeholder="retype password" 
              type="password" 
              name="password2" 
              onChange={this.handleChange}/>
            <RegisterButton onClick={this.handleSubmit}>Register</RegisterButton>
          </RegisterForm>
        }
        <LoginLink href="/login">Log In</LoginLink>
      </RegisterBox>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: registerErrors(state),
  isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (email, password1, password2) => {
    dispatch(register(email, password1, password2))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)