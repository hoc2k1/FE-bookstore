import { userTypes, url } from '../constants/action.types'
import storeConfig from '../config/storage.config'
import axios from 'axios'
import toast from 'react-hot-toast';
import { addNewCart, addToCart, deleteCart, getCart } from './cart.action';

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
      dispatch(setUser(res.data.user))
      dispatch(setLoginSuccess())

      let cart = getState().cartReducers.cart.data
      storeConfig.removeCartId()
      if (cart) {
        dispatch(deleteCart(cart._id))
        dispatch(addToCart({id_user: res.data.user.id, products: cart.products}))
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
    if (!storeConfig.getCartId()) {
      dispatch(addNewCart())
    }
    else {
      dispatch(getCart())
    }
    return false
  }
  if (!storeConfig.getCartId()) {
    dispatch(addNewCart(storeConfig.getUser().id))
  }
  else {
    dispatch(getCart())
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
    dispatch(setUser(storeConfig.getUser()))
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
export const addNewAddress = (data) => async (dispatch, getState) => {
  let id = storeConfig.getUser().id
  let res
  try {
    res = await axios.post(`${url.URL_BE}address/add`, {
      id_user: id,
      firstName: data.firstName,
      lastName: data.lastName,
      province: data.province,
      district: data.district,
      commune: data.commune,
      specificAddress: data.specificAddress,
      phoneNumber: data.phoneNumber,
    })
  }
  catch (err) {
    toast.error("Something when wrong!")
    return false
  }
  toast.success("Thêm địa chỉ thành công!")
  return true
}
export const editAddress = (data) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${url.URL_BE}address/update`, {
      firstName: data.firstName,
      lastName: data.lastName,
      province: data.province,
      district: data.district,
      commune: data.commune,
      specificAddress: data.specificAddress,
      phoneNumber: data.phoneNumber,
      id: data.id
    })
  }
  catch (err) {
    toast.error("Something when wrong!")
    return false
  }
  toast.success("Chỉnh sửa địa chỉ thành công!")
  return true
}
export const resetIsLogin = () => ({
  type: userTypes.RESET_IS_LOGIN
})
export const logout = () => (dispatch, getState) => {
  storeConfig.clear()
  dispatch(addNewCart())
  dispatch(setLoginFail())
  toast.success("Đăng xuất thành công!")
}
export const updateProfile = (data) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${url.URL_BE}user/updateinfor`, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    })
  }
  catch (err) {
    toast.error("Something when wrong!")
    return
  }
  if(res) {
    storeConfig.setUser(res.data.user)
    storeConfig.setToken(res.data.token)
    dispatch(setUser(res.data.user))
    toast.success("Thay đổi thông tin thành công!")
  }
}

export const changePassword = (data) => async (dispatch, getState) => {
  const email = storeConfig.getUser().email
  let res
  try {
    res = await axios.post(`${url.URL_BE}user/updatepassword`, {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      email: email
    })
  }
  catch (err) {
    console.log(11, err)
    toast.error("Something when wrong!")
    return
  }
  if(res) {
    if (res.data.error) {
      toast.error(res.data.error)
    }
    else {
      storeConfig.setUser(res.data.user)
      storeConfig.setToken(res.data.token)
      dispatch(setUser(res.data.user))
      toast.success("Thay đổi mật khẩu thành công!")
    }
  }
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
export const setUser = (data) => ({
  type: userTypes.SET_USER,
  data
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