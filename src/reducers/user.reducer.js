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
    case userTypes.RESET_IS_LOGIN:
      return {
        ...state,
        islogin: null
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
const forgotPassword = (state = {}, action) => {
  switch (action.type) {
    case userTypes.FORGOT_EMAIL_SUCCESS: {
      return {
        ...state,
        isForgot: true
      }
    }
    case userTypes.FORGOT_EMAIL_FAIL: {
      return {
        ...state,
        isForgot: false
      }
    }
    case userTypes.SET_EMAIL_FORGOTPASSWORD: {
      return {
        ...state,
        email: action.email
      }
    }
    case userTypes.VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        verify_otp: true,
        otp: action.otp
      }
    }
    case userTypes.VERIFY_OTP_FAIL: {
      return {
        ...state,
        verify_otp: false
      }
    }
    case userTypes.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotpassword: true
      }
    }
    case userTypes.FORGOT_PASSWORD_FAIL: {
      return {
        ...state,
        forgotpassword: false
      }
    }
    case userTypes.RESET_FORGOT_PASSWORD: {
      return {}
    }
    default: return state
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