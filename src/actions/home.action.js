import axios from 'axios'
import { homeTypes, sortTypes, url } from '../constants/action.types'

export const getBanner = () => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}banner/all`)
    res.data.data = res.data.data.sort((a, b) => {
      if (a.position == null) return 1;
      if (b.position == null) return -1; 
      return a.position - b.position;
   });
  }
  catch (err) {
    console.error('error: ', err )
    return
  }
  dispatch(setBanner(res.data.data))
}

export const getCategory = () => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}category/all`)
  }
  catch (err) {
    return
  }
  dispatch(setCategory(res.data.data))
}

export const getPublisher = () => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}publisher`)
  }
  catch (err) {
    return
  }
  dispatch(setPublisher(res.data.data))
}

export const getAuthor = () => async (dispatch, getState) => {
  let res
  try {
    res = await axios.get(`${url.URL_BE}author`)
  }
  catch (err) {
    return
  }
  dispatch(setAuthor(res.data.data))
}

export const getBook = () => async (dispatch, getState) => {
  let sorttype = 'release_date'
  let sortorder = '-1'
  let sortType = getState().homeReducers.book.sortType
  if (sortType === sortTypes.SORT_DAY_DECREASED) {
    sorttype = 'release_date'
    sortorder = '-1'
  } else if (sortType === sortTypes.SORT_DAY_INCREASED) {
    sorttype = 'release_date'
    sortorder = '1'
  } else if (sortType === sortTypes.SORT_PRICE_DECREASED) {
    sorttype = 'price'
    sortorder = '-1'
  } else if (sortType === sortTypes.SORT_PRICE_INCREASED) {
    sorttype = 'price'
    sortorder = '1'
  } else if (sortType === sortTypes.SORT_SALES_DECREASED) {
    sorttype = 'sales'
    sortorder = '-1'
  } else if (sortType === sortTypes.SORT_SALES_INCREASED) {
    sorttype = 'sales'
    sortorder = '1'
  } else if (sortType === sortTypes.SORT_VIEWS_DECREASED) {
    sorttype = 'view_counts'
    sortorder = '-1'
  } else if (sortType === sortTypes.SORT_VIEWS_INCREASED) {
    sorttype = 'view_counts'
    sortorder = '1'
  }
  let _link = `${url.URL_BE}book/allbook`
  let res
  try {
    res = await axios.post(_link, {
      page: getState().homeReducers.book.page,
      range: null,
      sorttype: sorttype,
      sortorder: sortorder,
      searchtext: getState().homeReducers.book.searchtext,
      id: getState().homeReducers.book.id
    })
  }
  catch (err) {
    console.log(err.response)
    return
  }
  dispatch(setBook(res.data.data))
  dispatch(setTotalPage(res.data.totalPage))
}

export const setBanner = (data) => ({
  type: homeTypes.SET_BANNER,
  data
})
export const setBook = (data) => ({
  type: homeTypes.SET_BOOK,
  data
})
export const setPage = (page) => ({
  type: homeTypes.SET_PAGE,
  page
})
export const setTotalPage = (totalpage) => ({
  type: homeTypes.SET_TOTAL_PAGE,
  totalpage
})
export const setCategory = (data) => ({
  type: homeTypes.SET_CATEGORY_BOOK,
  data
})

export const setPublisher = (data) => ({
  type: homeTypes.SET_PUBLISHSER,
  data
})

export const setAuthor = (data) => ({
  type: homeTypes.SET_AUTHOR,
  data
})
export const setSearchText = (searchtext) => ({
  type: homeTypes.SET_SEARCH_TEXT,
  searchtext
})