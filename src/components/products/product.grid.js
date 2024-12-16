import React from 'react'
import ProductCard from './product.card'
import { connect } from 'react-redux'
import Loading from '../loading/loading'

const ProductGrid = (props) => {
  if (props.loadingData) {
    return (
      <div className="flex-grow-1 d-flex my-2 my-md-4">
        <Loading />
      </div>
    )
  }
  else {
    let books = props.books
    let count = 0;
    if (props.productsData) {
      books = props.productsData
    }
    if (books && books.length > 0) {
      return (
        <div className="container my-2 my-md-4 px-0">
          <div className="row gx-2 gx-md-3 gx-lg-4 gap-y-grid">
            {books.map((item, index) => {
              if (props.limit) {
                if (count < props.limit && props.id_product_hidden != item._id ) {
                  count ++;
                  return (
                    <div key={index} className="col-6 col-md-4 col-lg-3">
                      <ProductCard product={item} />
                    </div>
                  )
                }
                else {
                  return null
                }
              }
              else {
                return (
                  <div key={index} className="col-6 col-md-4 col-lg-3">
                    <ProductCard product={item} />
                  </div>
                )
              }
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