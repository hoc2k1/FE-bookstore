import axios from 'axios'
import { productTypes, url } from '../constants/action.types'
import storeConfig from '../config/storage.config'
export const getBookDetail = (id) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}book/id/` + id)
  }
  catch (err) {
    console.error('error', err)
    return
  }
  dispatch(setProductDetail(res.data.data))
}

export const getBookRelated = (id) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}book/related/` + id)
  }
  catch (err) {
    return
  }
  dispatch(setBookRelated(res.data.data))
}
export const getNameCategoryByID = (id) => async (dispatch) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}category/name/` + id)
  }
  catch (err) {
    return
  }
  dispatch(setNameCategory(res.data.name))
}
export const getNamePubliserByID = (id) => async (dispatch) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}publisher/name/` + id)
  }
  catch (err) {
    return
  }

  dispatch(setNamePubliser(res.data.name))
}
export const getNameAuthorByID = (id) => async (dispatch) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}author/name/` + id)
  }
  catch (err) {
    return
  }

  dispatch(setNameAuthor(res.data.name))
}
export const setProductDetail = (productDetail) => ({
  type: productTypes.SET_PRODUCT_DETAIL,
  productDetail
})
export const setNameCategory = (name) => ({
  type: productTypes.SET_NAME_CATEGORY,
  name
})
export const setNamePubliser = (name) => ({
  type: productTypes.SET_NAME_PUBLICSHER,
  name
})

export const setBookRelated = (bookrelated) => ({
  type: productTypes.SET_BOOK_RELATED,
  bookrelated
})
export const setNameAuthor = (name) => ({
  type: productTypes.SET_NAME_AUTHOR,
  name
})

export const submitComment = (name, email, comment, id_book) => async (dispatch, getState) => {
  let id = null
  if (storeConfig.getUser() && storeConfig.getUser().id && storeConfig.getUser().id)
    id = storeConfig.getUser().id
  let res
  try {
    res = await axios.post(`${url.URL_BE}comment`, {
      id_user: id,
      id_book: id_book,
      name: name,
      comment: comment
    })
  }
  catch (err) {
    console.log(JSON.stringify(err.response))
    return
  }
  dispatch(getCommentByIDBook(id_book))
}

export const getAllBook = () => async (dispatch, getState) => {
  dispatch(setLoadingProductsData(true))
  let filterData = getState().productReducers.product.filter
  let _link = `${url.URL_BE}book/allbook`
  let res
  try {
    res = await axios.post(_link, filterData)
  }
  catch (err) {
    console.log(err.response)
    return
  }
  dispatch(setLoadingProductsData(false))
  dispatch(setAllBook(res.data.data))
  dispatch(setTotalPage(res.data.totalPage))
}

export const setAllBook = (data) => ({
  type: productTypes.SET_ALL_BOOK,
  data
})
export const setTotalPage = (totalpage) => ({
  type: productTypes.SET_TOTAL_PAGE,
  totalpage
})
export const setPage = (page) => ({
  type: productTypes.SET_PAGE,
  page
})
export const backPage = () => (dispatch, getState) => {
  let page = getState().productReducers.product.page
  if (page > 1) {
    dispatch(setPage(parseInt(page) - 1))
  }
}

export const nextPage = () => (dispatch, getState) => {
  let page = getState().productReducers.product.page
  let totalpage = getState().productReducers.product.totalpage
  if (page < totalpage) {
    dispatch(setPage(parseInt(page) + 1))
  }
}
export const getCommentByIDBook = (id) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`${url.URL_BE}comment/book`, {
      id_book: id,
      page: getState().productReducers.product.page
    })
  }
  catch (err) {
    console.log(JSON.stringify(err.response))
    return
  }
  dispatch(setTotalPage(res.data.totalPage))
  dispatch(setComment(res.data.data))
}
export const setComment = (data) => ({
  type: productTypes.SET_COMMENT,
  data
})

export const setFilter = (data) => ({
  type: productTypes.SET_FILTER,
  data
})

export const setLoadingProductsData = (data) => ({
  type: productTypes.SET_LOADING_PRODUCTS_DATA,
  data
})

setLoadingProductsData

export const addToCart = (product) => async (dispatch, getState) => {
  if (getState().userReducers.login.islogin) {
    let res
    try {
      res = await axios.post(`${url.URL_BE}cart/addtocard`, {
        id_user: storeConfig.getUser().id,
        products: [product]
      })
    }
    catch (err) {
      console.log(JSON.stringify(err.response))
      return
    }
  } else {
    storeConfig.addProductToCart(product)
  }
}
