import { userTypes, url } from '../constants/action.types'
import storeConfig from '../config/storage.config'
import axios from 'axios'

export const register = (data) => async (dispatch, getState) => {
  try {
    await axios.post(`${url.URL_BE}user/register`, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    })
    dispatch(login({email: data.email, password: data.password}))
    return true
  }
  catch (err) {
    console.error(err)
    return false
    // if (err.response.data.msg === "Email already exist")
    //   this.setState({ notificationRegister: 'Email already exist' })
    // else
    //   this.setState({ notificationRegister: 'Đăng Ký Thất Bại' })
    // return
  }
}

export const login = (data) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${url.URL_BE}user/login`, {
      email: data.email,
      password: data.password
    })
    if(res) {
      storeConfig.setUser(res.data.user)
      storeConfig.setToken(res.data.token)
      dispatch(setLoginSuccess())

      let cart = storeConfig.getCart()
      storeConfig.removeCart()
      if (cart !== null) {
        let res
        try {
          res = await axios.post(`${url.URL_BE}cart/addtocard`, {
            id_user: res.data.user._id,
            products: cart
          })
        }
        catch (err) {
          console.log(JSON.stringify(err.response))
        }
      }
      return true
    }
  }
  catch (err) {
    console.error(err)
    return false
    // if (err.response !== undefined) {
    //   if (err.response.data.msg === "no_registration_confirmation")
    //     this.setState({ notificationLogin: 'Tài Khoản Chưa Được Kích Hoạt, Vui Lòng Vào mail Để Kích Hoạt' })
    //   else {
    //     this.setState({ notificationLogin: 'Email or password invalid' })
    //   }
    // }
    // else {
    //   this.setState({ notificationLogin: 'Some thing went wrong' })
    // }
  }
}
export const auth = () => async (dispatch, getState) => {
  if (storeConfig.getUser() === null) {
    dispatch(setLoginFail())
    return false
  }
  let email = storeConfig.getUser().email
  let token = storeConfig.getToken()
  let res
  try {
    res = await axios.post(`${url.URL_BE}auth`, {
      email: email,
      token: token,
    })
  }
  catch (err) {
    console.log(888, err)
    dispatch(setLoginFail())
    return false
  }
  if (res.error) {
    dispatch(setLoginFail())
    return false
  }
  else {
    dispatch(setLoginSuccess())
    return true
  }
}
export const resetIsLogin = () => ({
  type: userTypes.RESET_IS_LOGIN
})
export const logout = () => (dispatch, getState) => {
  storeConfig.clear()
  dispatch(setLoginFail())
}
export const setEmail = (email) => ({
  type: userTypes.SET_EMAIL_LOGIN,
  email,
})
export const setLoginSuccess = () => ({
  type: userTypes.LOGIN_SUCCESS,
  data: 'login success'
})
export const setLoginFail = () => ({
  type: userTypes.LOGIN_FAIL,
  data: 'login fail'
})

export const forgotEmailSuccess = () => ({
  type: userTypes.FORGOT_EMAIL_SUCCESS
})
export const forgotEmailFail = () => ({
  type: userTypes.FORGOT_EMAIL_FAIL
})
export const resetForgotPassword = () => ({
  type: userTypes.RESET_FORGOT_PASSWORD
})
export const setEmailForgotPassword = (email) => ({
  type: userTypes.SET_EMAIL_FORGOTPASSWORD,
  email
})
export const submitForgotPassword = (email) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}user/request/forgotpassword/` + email)
  }
  catch (err) {
    dispatch(forgotEmailFail())
    return
  }
  dispatch(setEmailForgotPassword(res.data.email))
  dispatch(forgotEmailSuccess())
}
export const verifyOTPSuccess = (otp) => ({
  type: userTypes.VERIFY_OTP_SUCCESS,
  otp
})
export const verifyOTPFAIL = () => ({
  type: userTypes.VERIFY_OTP_FAIL
})

export const submitEnterNewPassword = (newPassword) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${url.URL_BE}user/forgotpassword`, {
      email: getState().userReducers.forgotPassword.email,
      otp: getState().userReducers.forgotPassword.otp,
      newPassword: newPassword
    })
  }
  catch (err) {
    dispatch(forgotPasswordFail())
    return
  }
  dispatch(forgotPasswordSuccess())
}

export const forgotPasswordSuccess = () => ({
  type: userTypes.FORGOT_PASSWORD_SUCCESS
})
export const forgotPasswordFail = () => ({
  type: userTypes.FORGOT_PASSWORD_FAIL
})