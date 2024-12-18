import axios from 'axios'
import storeConfig from '../config/storage.config'
import { profileTypes, url } from '../constants/action.types'

export const setUpdateInforSuccess = () => ({
  type: profileTypes.UPDATE_INFOR_USER_SUCCESS
})
export const setUpdateInforFail = () => ({
  type: profileTypes.UPDATE_INFOR_USER_FAIL
})
export const updateInfor = (email, firstName, lastName, address, phone_number) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${url.URL_BE}user/updateinfor`, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone_number: phone_number
    })
  }
  catch (err) {
    console.log(err)
    dispatch(setUpdateInforFail())
    return false
  }
  storeConfig.clear()
  storeConfig.setToken(res.data.token)
  storeConfig.setUser(res.data.user)
  dispatch(setUpdateInforSuccess())
  return true
}