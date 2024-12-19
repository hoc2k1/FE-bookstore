import { userTypes } from '../constants/action.types'
import { combineReducers } from 'redux'
const initial = {
  email: null,
  islogin: false
}

const login = (state = initial, action) => {
  switch (action.type) {
    case userTypes.SET_EMAIL_LOGIN: {
      return {
        ...state,
        email: action.email,
      }
    }
    case userTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        islogin: true
      }
    }
    case userTypes.LOGIN_FAIL: {
      return {
        ...state,
        islogin: false
      }
    }
    case userTypes.SET_LOADING_LOGIN_REGISTER:
      return {
        ...state,
        loadingLoginRegister: action.data
      }
    default: {
      return state
    }
  }
}
const user = (state = {}, action) => {
  switch (action.type) {
    case userTypes.SET_ADDRESSES: {
      return {
        ...state,
        addresses: action.data
      }
    }
    case userTypes.SET_ADDRESSES_LOADING: {
      return {
        ...state,
        addressesLoading: action.data
      }
    }
    case userTypes.SET_USER: {
      return {
        ...state,
        user: action.data
      }
    }
    default: return state
  }
}
export default combineReducers({
  login,
  user,
  forgotPassword
})