import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../actions/user.action'
import * as productActions from '../../actions/product.action'
import { bindActionCreators } from 'redux'
import { sortProducts, filterOptions, currency } from '../../constants/values'
import Button from '../button/button'

const Filter = (props) => {
  const [showFilter, setShowFilter] = useState(false)
  const [lowPrice, setLowPrice] = useState('')
  const [highPrice, setHighPrice] = useState('')
  const [popupRef] = useState({
    searchPublisher: useRef(null),
    searchCategory: useRef(null),
    searchAuthor: useRef(null),
    objRange: useRef(null)
  })
  const baseShowFilterOptions = {
    searchPublisher: false,
    searchCategory: false,
    searchAuthor: false,
    objRange: false
  }
  const [showFilterOptions, setShowFilterOptions] = useState(baseShowFilterOptions)
  const [selectedFilter, setSelectedFilter] = useState({
    searchPublisher: [],
    searchCategory: [],
    searchAuthor: [],
    objRange: null
  })
  useEffect(() => {
    const keyFilterOptionOpened = Object.keys(showFilterOptions).filter(item => showFilterOptions[item] == true)[0]
    if (keyFilterOptionOpened) {
      const popup = popupRef[keyFilterOptionOpened].current;
      const viewportWidth = window.innerWidth;

      if (popup) {
        const popupRect = popup.getBoundingClientRect();

        if (popupRect.left + popupRect.width > viewportWidth) {
          popup.style.left = 'unset';
          popup.style.right = '0';
        }
      }
    }
  }, [showFilterOptions])
  const handleSort = (event) => {
    const newFilterData = props.filter
    const newSort = sortProducts.filter(item => item.sortKey == event.target.value)[0]
    newFilterData.sortType = newSort.sortType
    newFilterData.sortOrder = newSort.sortOrder
    props.productActions.setFilter(newFilterData)
    props.productActions.getAllBook()
  }

  const removeOption = () => {
    
  }
  const clearAll = () => {

  }
  const chooseOption = (keyFilter, item) => {
    const newFilterData = props.filter
    newFilterData[keyFilter] = []

    selectedFilter[keyFilter] && selectedFilter[keyFilter].map((option, index) => {
      if (option._id != item._id) {
        newFilterData[keyFilter].push(option._id)
      }
    })
    if (!selectedFilter[keyFilter].includes(item)) {
      newFilterData[keyFilter].push(item._id)
    }
    props.productActions.setFilter(newFilterData)
    props.productActions.getAllBook()

    setSelectedFilter((prevSelectedFilter) => {
      const currentList = prevSelectedFilter[keyFilter];
  
      if (currentList.includes(item)) {
        return {
          ...prevSelectedFilter,
          [keyFilter]: currentList.filter((selectedItem) => selectedItem !== item),
        };
      } else {
        return {
          ...prevSelectedFilter,
          [keyFilter]: [...currentList, item],
        };
      }
    });
  }
  const handleFilterPrice = () => {
    if (lowPrice != null && lowPrice != '' && highPrice != null && highPrice != '' && !isNaN(lowPrice) && !isNaN(highPrice) && lowPrice <= highPrice) {
      const newFilterData = props.filter
      newFilterData.objRange = {
        low: lowPrice,
        high: highPrice
      }
      props.productActions.setFilter(newFilterData)
      props.productActions.getAllBook()

      setSelectedFilter((prevSelectedFilter) => {
        return {
          ...prevSelectedFilter,
          objRange: {
            low: lowPrice,
            high: highPrice
          },
        };
      });
      
    }
    else {
      if (!(lowPrice != null && lowPrice != '' && highPrice != null && highPrice != '')) {
        alert('Hãy nhập đủ giá trị!')
      }
      else if (!(!isNaN(lowPrice) && !isNaN(highPrice))) {
        alert('Hãy nhập số!')
      }
      else if (lowPrice > highPrice) {
        alert('Khoảng giá trị không tồn tại!')
      }
    }
  }
  const renderFilterOptions = (title, filterKey) => {
    let listData;
    switch(filterKey) {
      case 'searchPublisher':
        listData = props.publisher;
        break;
      case 'searchCategory':
        listData = props.category;
        break;
      case 'searchAuthor':
        listData = props.author;
        break;
      default:
        listData = ''
        break;
    }
    return (
      <div className="border p-2 d-flex position-relative gap-2">
        <div className="d-flex align-items-center cursor-pointer" onClick={() => setShowFilterOptions({...baseShowFilterOptions, [filterKey]: !showFilterOptions[filterKey]})}>
          <span className="text-nowrap text-capitalize">{title}</span>
          <i className={`fa fa-chevron-down icon_filter_aimation ${showFilterOptions[filterKey] && 'is_open_filter'}`}></i>
        </div>
        <div ref={popupRef[filterKey]} className={`position-absolute border-bottom border color-bg list-options-filter ${showFilterOptions[filterKey] ? 'd-flex' : 'd-none'}`}>
          {
            listData ? (
              <div>
                {listData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => chooseOption(filterKey, item)}
                    className={`d-flex p-2 align-items-center cursor-pointer ${(index != listData.length - 1) ? 'border-bottom' : '' }`}
                  >
                    <i className={`icon-checkbox ${selectedFilter[filterKey].includes(item) ? 'fa fa-check-square' : 'border'}`}></i>
                    <span className="text-nowrap text-capitalize">{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3">
                <div className="d-flex align-items-center">
                  <input
                    type="number" 
                    id=""
                    name=""
                    className="input range-price-input min-w px-3 py-2 border-bottom border-0"
                    onChange={e => setLowPrice(e.target.value)}
                  />
                  <span>{currency}</span>
                  <span className="text-nowrap">&nbsp;&nbsp;&nbsp;--->&nbsp;&nbsp;&nbsp;</span>
                  <input
                    type="number" 
                    id=""
                    name=""
                    className="input range-price-input px-3 py-2 border-bottom border-0"
                    onChange={e => setHighPrice(e.target.value)}
                  />
                  <span>{currency}</span>
                </div>
                <div className="d-flex justify-content-center">
                  <Button customButton={`w-fit mt-2`} onClick={() => handleFilterPrice()}>
                    <span>Áp dụng</span>
                  </Button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
  const renderFilterSelected = () => {
    return (
      <div>

      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border-top border-bottom p-3">
        <div className={`d-flex justify-content-between align-items-center gap-1 cursor-pointer ${showFilter && 'color-theme'}`} onClick={() => setShowFilter(!showFilter)}>
          <i className="fa fa-filter" aria-hidden="true"></i>
          <span>Lọc</span>
        </div>
        <div className="d-flex justify-content-between align-items-center gap-1">
          <span className='text-nowrap'>Sắp xếp: </span>
          <select className='select' onChange={handleSort}>
            {sortProducts.map((item, index) => {
              const defaultValue = props.filter.sortType + (props.filter.sortOrder == '1' ? 'asc' : 'dec')
              return (
                <option key={index} defaultValue={defaultValue} value={item.sortKey}>{ item.label }</option>
              )
            })}
          </select>
        </div>
      </div>
      <div className={`filter-option ${showFilter && 'active'}`}>
        <div className="d-flex flex-wrap mt-2 gap-2">
          {filterOptions.map((item, index) => {
            return (
              <div key={index}>
                {renderFilterOptions(item.title, item.key)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
    category: state.homeReducers.category.data,
    publisher: state.homeReducers.publisher.data,
    author: state.homeReducers.author.data,
    books: state.productReducers.product.books,
    filter: state.productReducers.product.filter,
    page: state.homeReducers.book.page,
  })

const mapDispatchToProps = dispatch => {
return ({
  actions: bindActionCreators(userActions, dispatch),
  productActions: bindActionCreators(productActions, dispatch)
})
}
export default connect(
mapStateToProps,
mapDispatchToProps
)(Filter)