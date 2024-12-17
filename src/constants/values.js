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

export const inputStatus = {
  normal: 'normal',
  error: 'error',
  success: 'success'
}

export const loginForm = [
  {
    inputKey: 'email',
    type: 'email',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Email',
    errorMessage: 'Email không hợp lệ'
  },
  {
    inputKey: 'password',
    type: 'password',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Password',
    errorMessage: 'Mật khẩu phải có ít nhất 6 ký tự'
  }
]
export const registerForm = [
  {
    inputKey: 'firstName',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Họ',
    errorMessage: 'Tên không hợp lệ'
  },
  {
    inputKey: 'lastName',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Tên',
    errorMessage: 'Tên không hợp lệ'
  },
  {
    inputKey: 'email',
    type: 'email',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Email',
    errorMessage: 'Email không hợp lệ'
  },
  {
    inputKey: 'password',
    type: 'password',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Mật khẩu',
    errorMessage: 'Mật khẩu phải có ít nhất 6 ký tự'
  },
  {
    inputKey: 'confirmPassword',
    type: 'password',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Xác nhận mật khẩu',
    errorMessage: 'Mật khẩu không trùng khớp'
  }
]

export const addressForm = [
  {
    inputKey: 'firstName',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Họ',
    errorMessage: 'Tên không hợp lệ'
  },
  {
    inputKey: 'lastName',
    type: 'text',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Tên',
    errorMessage: 'Tên không hợp lệ'
  },
  {
    inputKey: 'province',
    type: 'picker',
    placeholder: 'Chọn tỉnh/thành phố',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Tỉnh/Thành phố',
    errorMessage: 'Tên tỉnh/thành phố không hợp lệ'
  },
  {
    inputKey: 'district',
    type: 'picker',
    placeholder: 'Chọn quận/huyện',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Quận/huyện',
    errorMessage: 'Tên quận/huyện không hợp lệ'
  },
  {
    inputKey: 'commune',
    type: 'picker',
    placeholder: 'Chọn phường/xã',
    isValidate: false,
    defaultValue: '',
    required: false,
    label: 'Phường/Xã',
    errorMessage: 'Tên phường/xã không hợp lệ'
  },
  {
    inputKey: 'specificAddress',
    type: 'text',
    placeholder: '',
    isValidate: false,
    defaultValue: '',
    required: false,
    label: 'Địa chỉ cụ thể',
    errorMessage: ''
  },
  {
    inputKey: 'phoneNumber',
    type: 'number',
    placeholder: '',
    isValidate: true,
    defaultValue: '',
    required: true,
    label: 'Số điện thoại',
    errorMessage: 'Số điện thoại không hợp lệ'
  }
]

export const listUserPage = [
  {
    key: 'profile',
    title: "Thông tin tài khoản",
    url: '/profile',
    icon: 'user'
  },
  {
    key: 'addresses',
    title: "Địa chỉ giao hàng",
    url: '/addresses',
    icon: 'map'
  },
  {
    key: 'signOut',
    title: "Đăng xuất",
    url: '/',
    icon: 'hand-o-left'
  }
]

export const listPageInHeader = [
  {
    key: 'home',
    url: '/',
    title: 'Trang chủ'
  },
  {
    key: 'products',
    url: '/products',
    title: 'Sản phẩm'
  },
  {
    key: 'products',
    url: '/contact',
    title: 'Liên hệ'
  }
]