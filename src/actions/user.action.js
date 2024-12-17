import { userTypes, url } from '../constants/action.types'
import storeConfig from '../config/storage.config'
import axios from 'axios'
import toast from 'react-hot-toast';

export const register = (data) => async (dispatch, getState) => {
  try {
    await axios.post(`${url.URL_BE}user/register`, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    })
    toast.success("Đăng ký thành công")
    dispatch(login({email: data.email, password: data.password, hiddenToast: true}))
    return true
  }
  catch (err) {
    console.error(err)
    if (err.response.data.msg === "Email already exist")
      toast.error("Email đã tồn tại!")
    else
      toast.error("Something when wrong!")
    return false
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
      if (!data.hiddenToast) {
        toast.success("Đăng nhập thành công")
      }
      return true
    }
  }
  catch (err) {
    console.error(err)
    if (err.response !== undefined) {
      toast.error("Email hoặc mật khẩu không chính xác!")
    }
    else {
      toast.error("Something when wrong!")
    }
    return false
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

export const getAllAddresses = () => async (dispatch, getState) => {
  let id = storeConfig.getUser().id
  let res
  dispatch(setAddressesLoading(true))
  try {
    res = await axios.post(`${url.URL_BE}address/all`, {
      id_user: id
    })
  }
  catch (err) {
    toast.error("Something when wrong!")
    return false
  }
  dispatch(setAddressesLoading(false))
  dispatch(setAddresses(res.data.data))
}
export const deleteAddress = (idAddress) => async (dispatch, getState) => {
  try {
    await axios.get(`${url.URL_BE}address/delete/${idAddress}`)
  }
  catch (err) {
    toast.error("Something when wrong!")
    return false
  }
  toast.success("Xoá địa chỉ thành công!")
  dispatch(getAllAddresses())
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
export const setAddresses = (data) => ({
  type: userTypes.SET_ADDRESSES,
  data
})
export const setAddressesLoading = (data) => ({
  type: userTypes.SET_ADDRESSES_LOADING,
  data
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