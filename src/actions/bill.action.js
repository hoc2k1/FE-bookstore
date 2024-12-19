

import { billTypes, url } from '../constants/action.types'
import axios from 'axios'
import storeConfig from '../config/storage.config'
import toast from 'react-hot-toast'
import { billStatus } from '../constants/values'
import { deleteCart, setCart } from './cart.action'

export const findById = (id_bill) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}bill/getbill/${id_bill}`)
  }
  catch (err) {
    toast.error("Something when wrong!")
    console.log(err)
    return false
  }
  if(res.data.data) {
    return res.data.data
  }
  else if (res.data.error) {
    toast.error(res.data.error)
    return false
  }
}
export const findOrAdd = (data) => async (dispatch, getState) => {
  const id_user = storeConfig.getUser().id
  let res
  try {
    res = await axios.post(`${url.URL_BE}bill/findoradd`, {
      id_user: id_user,
      products: data?.products,
      status: billStatus.pending,
      total: data?.total,
      subtotal: data?.subtotal,
      discount: data?.discount
    })
  }
  catch (err) {
    toast.error("Something when wrong!")
    console.log(err)
    return false
  }
  if(res.data.data) {
    dispatch(setBill(res.data.data))
    return true
  }
  else if (res.data.error) {
    toast.error(res.data.error)
    return false
  }
}
export const updateBill = (data) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${url.URL_BE}bill/update`, {
      id: data.id,
      payment_method: data.payment_method,
      address: data.address,
      phone: data.phone,
      status: data.status,
      name: data.name
    })
  }
  catch (err) {
    toast.error("Something when wrong!")
    console.log(err)
    return false
  }
  if(res.data.data) {
    dispatch(setBill(res.data.data))
    return true
  }
  else {
    toast.error(res.data.error)
    return false
  }
}
export const checkout = (id_bill) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}bill/checkout/${id_bill}`)
  }
  catch (err) {
    toast.error("Something when wrong!")
    console.log(err)
    return false
  }
  if(res.data.data) {
    const cart_id = storeConfig.getCartId()
    dispatch(setBill({}))
    dispatch(deleteCart(cart_id))
    dispatch(setCart({}))
    storeConfig.removeCartId()
    toast.success("Đặt hàng thành công")
    return true
  }
  else {
    toast.error(res.data.error)
    return false
  }
}

export const setBill = (data) => ({
  type: billTypes.SET_BILL,
  data
})