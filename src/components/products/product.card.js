import React from 'react'
import { connect } from 'react-redux'
import { currency, keyFilter, packPrice } from '../../constants/values' 
import Price from '../product.detail/product.price'

const ProductCard = (props) => {
  const author = props.author.filter(item => item._id == props.product.id_author)[0]
  const category = props.category.filter(item => item._id == props.product.id_category)[0]
  const publisher = props.publisher.filter(item => item._id == props.product.id_publisher)[0]
  const imageUrl = (props.product.img && props.product.img[0]) ? props.product.img[0] : '../../../assets/images/shop/placeholder-image.png'
  return (
    <div className={`${props.isCart ? 'd-flex gap-md-3 gap-2 py-2 py-md-3 align-items-center w-100' : 'product-card border'}`}>
      <div className={`${props.isCart ? 'w-25' : 'w-100'}`}>
        <a href={'/product/' + props.product._id}><img src={imageUrl} alt="" className="product-image"/></a>
      </div>
      <div>
        <div className="mt-1">
          <a href={'/product/' + props.product._id} className="text-link heading list-unstyled"><span>{props.product.name}</span></a>
        </div>
        {props.product.is_package && (
          <div>
            <span>Đóng gói ({packPrice}<sup>{currency}</sup> / 1 sản phẩm)</span>
          </div>
        )}
        <Price isSmall={props.isCart} price={props.product.price} sales={props.product.sales}/>
        {category && (<span><span className="fw-bold">Thể loại: </span><a className="text-link" href={`/products/?${keyFilter.SEARCH_CATEGORY}=${category._id}`}>{category.name}</a><br/></span>)}
        {author && (<span><span className="fw-bold">Tác giả: </span><a className="text-link" href={`/products?${keyFilter.SEARCH_AUTHOR}=${author._id}`}>{author.name}</a><br/></span>)}
        {publisher && (<span><span className="fw-bold">Nhà sản xuất: </span><a className="text-link" href={`/products?${keyFilter.SEARCH_PUBLISHER}=${publisher._id}`}>{publisher.name}</a></span>)}
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