import React from 'react'
import { connect } from 'react-redux'
import { keyFilter } from '../../constants/values' 
import Price from '../product.detail/product.price'
import AddToCart from '../global/add.to.cart'

const ProductCard = (props) => {
  const author = props.author.filter(item => item._id == props.product.id_author)[0]
  const category = props.category.filter(item => item._id == props.product.id_category)[0]
  const publisher = props.publisher.filter(item => item._id == props.product.id_nsx)[0]
  const imageUrl = (props.product.img && props.product.img[0]) ? props.product.img[0] : '../../../assets/images/shop/placeholder-image.png'
  return (
    <div className="product-card border">
      <div className="product-image-wrapper">
        <a href={'/product/' + props.product._id}><img src={imageUrl} alt="" className="product-image"/></a>
      </div>
      <div>
        <div className="mt-1">
          <a href={'/product/' + props.product._id} className="text-link heading list-unstyled"><span>{props.product.name}</span></a>
        </div>
        <Price price={props.product.price} sales={props.product.sales}/>
        <span><span className="fw-bold">Thể loại: </span><a className="text-link" href={`/products/?${keyFilter.SEARCH_CATEGORY}=${category._id}`}>{category.name}</a></span>
        <br/>
        <span><span className="fw-bold">Tác giả: </span><a className="text-link" href={`/products?${keyFilter.SEARCH_AUTHOR}=${author._id}`}>{author.name}</a></span>
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