import React, { Component } from "react";
import { connect } from "react-redux";
import { keyFilter } from "../../constants/values";
import Price from "./product.price";
import AddToCart from "../global/add.to.cart";
import ViewAll from "../global/view.all";
import { checkNotEmpty } from "../../config/identify"
import ProductGrid from "../products/product.grid";

class ContentProductDetail extends Component {
  constructor(props) {
    super(props);
    this.author = this.props.author.filter(item => item._id == this.props.productDetail.id_author)[0]
    this.category = this.props.category.filter(item => item._id == this.props.productDetail.id_category)[0]
    this.publisher = this.props.publisher.filter(item => item._id == this.props.productDetail.id_nsx)[0]
    this.imageUrl = (this.props.productDetail.img && this.props.productDetail.img[0]) ? this.props.productDetail.img[0] : '../../../assets/images/shop/placeholder-image.png'
    this.state = {
      showDescription: false
    }
    
  }
  renderDescription() {
    return (
      <div className="border-bottom border-top mt-2 px-2 px-md-3">
        <div className="w-100 cursor-pointer d-flex flex-row align-items-center py-3 justify-content-between" onClick={() => this.setState({showDescription: !this.state.showDescription})}>
          <span className="heading-small">Mô tả sản phẩm</span>
          <i className={`fa fa-chevron-down rotate-icon ${this.state.showDescription ? 'active' : ''}`}></i>
        </div>
        <div className={`filter-option d-flex ${this.state.showDescription ? 'active' : ''}`}>

          <span className={`pb-2 pb-md-3`}>{this.props.productDetail.describe}</span>
        </div>
      </div>
    )
  }
  renderListProduct(keyRelated, releatedData) {
    let title;
    let value;
    if (keyRelated == keyFilter.SEARCH_AUTHOR) {
      title = 'Cùng tác giả';
      value = this.author._id;
    }
    else if (keyRelated == keyFilter.SEARCH_CATEGORY) {
      title = 'Cùng thể loại';
      value = this.category._id;

    }
    else if (keyRelated == keyFilter.SEARCH_PUBLISHER) {
      title = 'Cùng nhà sản xuất';
      value = this.publisher._id;
    }
    return (
      <div className="py-2 py-md-3">
        <div className="d-flex justify-content-between align-items-center">
          <span className="heading">{title}</span>
          {parseInt(releatedData.totalPage) > 1 && (<ViewAll url={`/products?${keyRelated}=${value}`} />) }
        </div>
        <ProductGrid productsData={releatedData.data} limit={this.props.bookRelated.limitRelatedBooks} id_product_hidden={this.props.productDetail._id}/>
      </div>
    )
  }
  render() {
    return (
      <div className="container my-md-4 my-2">
        <div className={`d-flex flex-column flex-md-row gap-md-4 mb-3 mb-md-5`}>
          <div className="ư-100 w-md-50">
            <img src={this.imageUrl} alt="" className="product-image"/>
          </div>
          <div className="flex-grow-1">
            <div className="px-2 px-md-3">
              <div className="mt-1">
                <span className="heading list-unstyled">{this.props.productDetail.name}</span>
              </div>
              <Price price={this.props.productDetail.price} sales={this.props.productDetail.sales}/>
              <span><span className="fw-bold">Thể loại: </span><a className="text-link" href={`/products/?${keyFilter.SEARCH_CATEGORY}=${this.category._id}`}>{this.category.name}</a></span>
              <br/>
              <span><span className="fw-bold">Tác giả: </span><a className="text-link" href={`/products?${keyFilter.SEARCH_AUTHOR}=${this.author._id}`}>{this.author.name}</a></span>
              <br/>
              <span><span className="fw-bold">Nhà sản xuất: </span><a className="text-link" href={`/products?${keyFilter.SEARCH_PUBLISHER}=${this.publisher._id}`}>{this.publisher.name}</a></span>
              <AddToCart product={this.props.productDetail}/>
            </div>
            {this.renderDescription()}
          </div>
        </div>
        { checkNotEmpty(this.props.bookRelated) && 
          checkNotEmpty(this.props.bookRelated.releatedBooksByAuthor) && 
          checkNotEmpty(this.props.bookRelated.releatedBooksByAuthor.data) && 
          this.renderListProduct(keyFilter.SEARCH_AUTHOR, this.props.bookRelated.releatedBooksByAuthor)
        }
        { checkNotEmpty(this.props.bookRelated) && 
          checkNotEmpty(this.props.bookRelated.releatedBooksByAuthor) && 
          checkNotEmpty(this.props.bookRelated.releatedBooksByAuthor.data) && 
          this.renderListProduct(keyFilter.SEARCH_CATEGORY, this.props.bookRelated.releatedBooksByCategory)
        }
        { checkNotEmpty(this.props.bookRelated) && 
          checkNotEmpty(this.props.bookRelated.releatedBooksByAuthor) && 
          checkNotEmpty(this.props.bookRelated.releatedBooksByAuthor.data) && 
          this.renderListProduct(keyFilter.SEARCH_PUBLISHER, this.props.bookRelated.releatedBooksByPublisher)
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  category: state.homeReducers.category.data,
  publisher: state.homeReducers.publisher.data,
  author: state.homeReducers.author.data,
  productDetail: state.productReducers.product.productDetail,
  islogin: state.userReducers.login.islogin,
  bookRelated: state.productReducers.product.bookRelated,
  comment: state.productReducers.product.comment,
});

export default connect(mapStateToProps, null)(ContentProductDetail);
