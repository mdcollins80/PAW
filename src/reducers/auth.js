import jwtDecode from 'jwt-decode'
import * as auth from '../actions/auth'

const initialState = {
  access: undefined,
  refresh: undefined,
  loginErrors: {},
  registerErrors: {},
}


export default (state=initialState, action) => {
  switch(action.type) {
    case auth.LOGIN_SUCCESS:
      return {
        access: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        },
        refresh: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        },

        loginErrors: {}
    }

    case auth.REGISTER_SUCCESS:
      return {
        access: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        },
        refresh: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        },
        registerErrors: {}
    }
    case auth.TOKEN_RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        }
      }

    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
      return {
         access: undefined,
         refresh: undefined,
         loginErrors:
             action.payload.response ||
                {'non_field_errors': action.payload.statusText},
      }

    case auth.REGISTER_FAILURE:
      return {
         access: undefined,
         refresh: undefined,
         registerErrors:
             action.payload.response ||
                {'non_field_errors': action.payload.statusText},
      }
    
    default:
      return state
    }
}

export function accessToken(state) {
    if (state.access) {
        return  state.access.token
    }
}

export function refreshToken(state) {
    if (state.refresh) {
        return  state.refresh.token
    }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
  }
  return true
}

export function isRefreshTokenExpired(state) {
  if (state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
  }
  return true
}

export function isAuthenticated(state) {
  return !isAccessTokenExpired(state)
}

export function theUser(state) {
  if (state.access) {
    return state.access.user_id
  }
}

export function loginErrors(state) {
   return  state.loginErrors
}
export function registerErrors(state) {
   return  state.registerErrors
}
