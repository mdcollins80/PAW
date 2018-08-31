import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';
export const REGISTER_REQUEST = '@@auth/REGISTER_REQUEST';
export const REGISTER_SUCCESS = '@@auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = '@@auth/REGISTER_FAILURE';

export const login = (username, password) => ({
  [RSAA]: {
    endpoint: process.env.REACT_APP_API_URL +  '/api/auth/token/obtain/',
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json' },
    types: [
      LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
    ]
  }
})

export const register = (first, last, email, password1, password2) => ({
  [RSAA]: {
    endpoint: process.env.REACT_APP_API_URL +  '/api/rest-auth/registration/',
    method: 'POST',
    body: JSON.stringify({first, last, email, password1, password2}),
    headers: { 'Content-Type': 'application/json' },
    types: [
      REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
    ]
  }
})

export const refreshAccessToken = (token) => ({
  [RSAA]: {
    endpoint: process.env.REACT_APP_API_URL +  '/api/auth/token/refresh/',
    method: 'POST',
    body: JSON.stringify({token}),
    headers: { 'Content-Type': 'application/json' },
    types: [
      TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
    ]
  }
})