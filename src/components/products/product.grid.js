import React from 'react'
import ProductCard from './product.card'
import { connect } from 'react-redux'
import Loading from '../loading/loading'
import ProductsPagination from './products.pagination'

const ProductGrid = (props) => {
  if (props.loadingData) {
    return (
      <div className="flex-grow-1 d-flex my-2 my-md-4">
        <Loading />
      </div>
    )
  }
  else {
    if (props.books && props.books.length > 0) {
      return (
        <div className="container my-2 my-md-4">
          <div className="row gx-2 gx-md-3 gx-lg-4 gap-y-grid">
            {props.books.map((item, index) => {
              return (
                <div key={index} className="col-6 col-md-4 col-lg-3">
                  <ProductCard product={item} />
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="my-2 my-md-4">
          <p>Không có sản phẩm nào</p>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  books: state.productReducers.product.books,
  loadingData: state.productReducers.product.loadingProducts,
  totalPage: state.productReducers.totalpage
})

export default connect(
  mapStateToProps,
  null
)(ProductGrid)