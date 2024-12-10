import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../actions/user.action'
import * as productActions from '../../actions/product.action'
import { bindActionCreators } from 'redux'
import { sortProducts } from '../../constants/values'

const Filter = (props) => {
  const [showFilter, setShowFilter] = useState(false)
  const handleSort = async (event) => {
    const newFilterData = props.filter
    const newSort = sortProducts.filter(item => item.sortKey == event.target.value)[0]
    newFilterData.sortType = newSort.sortType
    newFilterData.sortOrder = newSort.sortOrder
    props.productActions.setFilter(newFilterData)
    props.productActions.getAllBook()
  }
  console.log(34, showFilter)
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
        <p>asdf</p>
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