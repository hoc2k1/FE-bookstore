
import { combineReducers } from 'redux'
import { profileTypes } from '../constants/action.types'
const profile = (state = {}, action) => {
  switch (action.type) {
    case profileTypes.UPDATE_INFOR_USER_SUCCESS: {
      return {
        ...state,
        isupdate: true
      }
    }
    case profileTypes.UPDATE_INFOR_USER_FAIL: {
      return {
        ...state,
        isupdate: false
      }
    }
    default: return state
  }
}
export default combineReducers({
  profile,
})