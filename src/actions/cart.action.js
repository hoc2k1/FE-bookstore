import { cartTypes, url } from '../constants/action.types'
import axios from 'axios'
import storeConfig from '../config/storage.config'
import toast from 'react-hot-toast'

export const setCart = (data) => ({
  type: cartTypes.SET_CART,
  data
})
export const addNewCart = (id_user) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${url.URL_BE}cart/add`, {
      id_user: id_user
    })
  }
  catch (err) {
    toast.error("Something when wrong!")
    console.log(err)
    return
  }
  if(res.data.data) {
    storeConfig.setCartId(res.data.data._id)
    dispatch(setCart(res.data.data))
  }
}
export const getCart = () => async (dispatch, getState) => {
  let id_cart = storeConfig.getCartId();
  if (id_cart) {
    let cart;
    try {
      cart = await axios.get(`${url.URL_BE}cart/` + id_cart)
    }
    catch (err) {
      console.log(err)
      return
    }
    if (cart.data.data !== null) {
      dispatch(setCart(cart.data.data))
    }
  }
}
export const addToCart = ({ products=[], id_user=null }) => async (dispatch, getState) => {
  const id_cart = storeConfig.getCartId()
  let res
  try {
    res = await axios.post(`${url.URL_BE}cart/addtocard`, {
      id_user: id_user,
      id: id_cart,
      products: products
    })
  }
  catch (err) {
    toast.error("Something when wrong!")
    console.log(JSON.stringify(err.response))
    return false
  }
  if (id_user) {
    storeConfig.setCartId(res.data.data._id)
  }
  else {
    if (res.data.data) {
      toast.success('Thêm vào giỏ hàng thành công!')
    }
    else {
      toast.error(res.data.error)
    }
  }
  if (res.data.data) {
    console.log(342, res.data.data)
    dispatch(setCart(res.data.data))
    return true
  }
  else {
    return false
  }
}
export const updateProductInCart = (product) => async (dispatch, getState) => {
  if (!getState().userReducers.login.islogin) {
    storeConfig.updateProductInCart(product)
  }
  else {
    try {
      await axios.post(`${url.URL_BE}cart/update`, {
        id_user: storeConfig.getUser().id,
        product: product
      })
    }
    catch (err) {
      console.log(err.response)
    }
  }
  dispatch(getCart())
}
export const deteleProductInCart = (id_product) => async (dispatch, getState) => {
  if (!getState().userReducers.login.islogin) {
    storeConfig.deteleProductInCart(id_product)
  } else {
    try {
      await axios.post(`${url.URL_BE}cart/delete`, {
        id_user: storeConfig.getUser().id,
        id_product: id_product
      })
    }
    catch (err) {
      console.log(err.response)
    }
  }
  dispatch(getCart())
}

export const deleteCart = (id_cart) => async (dispatch, getState) => {
  try {
    await axios.get(`${url.URL_BE}cart/delete/${id_cart}`)
  }
  catch (err) {
    console.log(err.response)
  }
}


export const paymentSuccess = () => ({
  type: cartTypes.PAYMENT_SUCCESS
})
export const paymentFail = () => ({
  type: cartTypes.PAYMENT_FAIL
})
export const resetPayment = () => ({
  type: cartTypes.RESET_PAYMENT
})
export const payment = (address, phone, name, total) => async (dispatch, getState) => {
  let res = null
  try {
    res = await axios.post(`${url.URL_BE}bill/add`, {
      id_user: storeConfig.getUser().id,
      address: address,
      phone: phone,
      name: name,
      total: total,
      email: storeConfig.getUser().email
    })
  }
  catch (err) {
    dispatch(paymentFail())
    console.log(err.response)
    dispatch(resetPayment())
    return
  }
  dispatch(paymentSuccess())
  dispatch(resetPayment())
  dispatch(getCart())
}