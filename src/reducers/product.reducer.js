import { combineReducers } from 'redux'
import { productTypes } from '../constants/action.types'
const product = (state = { productDetail: null, bookRelated: {}, comment: [], page: 1, totalpage: null }, action) => {
  switch (action.type) {
    case productTypes.SET_PRODUCT_DETAIL: {
      return {
        ...state,
        productDetail: action.productDetail
      }
    }
    case productTypes.SET_BOOK_RELATED: {
      return {
        ...state,
        bookRelated: action.bookRelated
      }
    }
    case productTypes.SET_COMMENT: {
      return {
        ...state,
        comment: action.data
      }
    }
    case productTypes.SET_PAGE: {
      return {
        ...state,
        page: action.page
      }
    }
    case productTypes.SET_TOTAL_PAGE: {
      return {
        ...state,
        totalpage: action.totalpage
      }
    }
    case productTypes.SET_FILTER: {
      return {
        ...state,
        filter: action.data
      }
    }
    case productTypes.SET_ALL_BOOK: {
      return {
        ...state,
        books: action.data
      }
    }
    case productTypes.SET_LOADING_PRODUCTS_DATA: {
      return {
        ...state,
        loadingProducts: action.data
      }
    }
    default: return state
  }
}
export default combineReducers({
  product,
})