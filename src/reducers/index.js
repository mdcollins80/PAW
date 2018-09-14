import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth.js'


export default combineReducers({
  auth: auth,
  router: routerReducer
})

export const isAuthenticated =
  state => fromAuth.isAuthenticated(state.auth)
export const accessToken =
  state => fromAuth.accessToken(state.auth)
export const theUser = 
  state => fromAuth.theUser(state.auth)
export const isAccessTokenExpired =
  state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken =
  state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired =
  state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors =
  state => fromAuth.loginErrors(state.auth)
export const authSignup =
  state => fromAuth.registerErrors(state.auth)

export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'Authorization': `JWT ${accessToken(state)}`
  })
}