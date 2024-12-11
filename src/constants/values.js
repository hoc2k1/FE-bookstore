export const baseFilter = {
  searchText: '',
  searchPublisher: '',
  searchAuthor: '',
  searchCategory: '',
  sortType: 'name',
  sortOrder: '1',
  objRange: null,
  page: 1
}

export const keyFilter = {
  SEARCH_TEXT: 'searchText',
  SEARCH_PUBLISHER: 'searchPublisher',
  SEARCH_AUTHOR: 'searchAuthor',
  SEARCH_CATEGORY: 'searchCategory',
  SORT_TYPE: 'sortType',
  SORT_ORDER: 'sortOrder',
  OBJECT_RANGE: 'objRange',
  PAGE: 'page'
}

export const filterOptions = [
  {
    key: 'searchPublisher',
    title: 'Nhà sản xuất'
  },
  {
    key: 'searchCategory',
    title: 'Thể loại'
  },
  {
    key: 'searchAuthor',
    title: 'Tác giả'
  },
  {
    key: 'objRange',
    title: 'Giá'
  }
]

export const LIMIT_NUMBER_OF_PRODUCTS = 30

export const sortProducts = [
  {
    sortOrder: '1',
    sortKey: 'name_asc',
    sortType: 'name',
    label: 'Tên ⬆',
  },
  {
    sortOrder: '-1',
    sortKey: 'name_dec',
    sortType: 'name',
    label: 'Tên ⬇'
  },
  {
    sortOrder: '1',
    sortKey: 'price_asc',
    sortType: 'price',
    label: 'Giá ⬆'
  },
  {
    sortOrder: '-1',
    sortKey: 'price_dec',
    sortType: 'price',
    label: 'Giá ⬇'
  },
  {
    sortOrder: '1',
    sortKey: 'release_date_asc',
    sortType: 'release_date',
    label: 'Thời gian ⬆'
  },
  {
    sortOrder: '-1',
    sortKey: 'release_date_dec',
    sortType: 'release_date',
    label: 'Thời gian ⬇'
  }
]

export const currency = 'đ'