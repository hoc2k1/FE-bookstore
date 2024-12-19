import { combineReducers } from 'redux'
import { billTypes } from '../constants/action.types'

const bill = (state = { data: [] }, action) => {
  switch (action.type) {
    case billTypes.SET_BILL: {
      return {
        ...state,
        data: action.data
      }
    }
    default: return state
  }
}
export default combineReducers({
  bill
})