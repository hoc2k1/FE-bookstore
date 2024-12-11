import React from 'react'
import { connect } from 'react-redux'
import { keyFilter } from '../../constants/values' 

const ProductCard = (props) => {
  const author = props.author.filter(item => item._id == props.product.id_author)[0]
  const category = props.category.filter(item => item._id == props.product.id_category)[0]
  const publisher = props.publisher.filter(item => item._id == props.product.id_nsx)[0]

  return (
    <div className="product-card border">
      <div className="product-image-wrapper">
        <a href={'/product/' + props.product._id}><img src={props.product.img} alt="" className="product-image"/></a>
      </div>
      <div>
        <div className="mt-1">
          <a href={'/product/' + props.product._id} className="text-link heading list-unstyled"><span>{props.product.name}</span></a>
        </div>
        <span><span className="fw-bold">Thể loại: </span><a className="text-link" href={`/products/?${keyFilter.SEARCH_CATEGORY}=${category._id}`}>{author.name}</a></span>
        <br/>
        <span><span className="fw-bold">Tác giả: </span><a className="text-link" href={`/products?${keyFilter.SEARCH_AUTHOR}=${author._id}`}>{category.name}</a></span>
        <br/>
        <span><span className="fw-bold">Nhà sản xuất: </span><a className="text-link" href={`/products?${keyFilter.SEARCH_PUBLISHER}=${publisher._id}`}>{publisher.name}</a></span>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  category: state.homeReducers.category.data,
  publisher: state.homeReducers.publisher.data,
  author: state.homeReducers.author.data,
  books: state.productReducers.product.books
})

export default connect(
  mapStateToProps,
  null
)(ProductCard)