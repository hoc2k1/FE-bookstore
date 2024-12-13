import React, { Component } from "react";
import storeConfig from "../../config/storage.config";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { keyFilter } from "../../constants/values";
import Price from "./product.price";
import AddToCart from "../global/add.to.cart";
class ContentProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      notificationComment: "",
      comment: "",
      quantity: 1,
      noti: false,
      show: false,
      pagination: []
    };
    this.author = this.props.author.filter(item => item._id == this.props.productDetail.id_author)[0]
    this.category = this.props.category.filter(item => item._id == this.props.productDetail.id_category)[0]
    this.publisher = this.props.publisher.filter(item => item._id == this.props.productDetail.id_nsx)[0]
    this.imageUrl = (this.props.productDetail.img && this.props.productDetail.img[0]) ? this.props.productDetail.img[0] : '../../../assets/images/shop/placeholder-image.png'
  }
  componentWillMount() {
    if (storeConfig.getUser() !== null) {
      this.setState({
        name: storeConfig.getUser().firstName,
        email: storeConfig.getUser().email
      });
    } else {
      this.setState({
        name: "",
        email: ""
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.islogin === false) {
      this.setState({
        name: "",
        email: ""
      });
    }
  }
  handlename = name => {
    if (this.state.name === "") {
      this.setState({ name: name });
    }
  };
  submitComment = () => {
    if (this.state.name === "") {
      this.setState({ notificationComment: "Name must not be blank " });
      return;
    } else {
      this.setState({ notificationComment: "" });
    }
    if (this.state.comment === "") {
      this.setState({ notificationComment: "Comment must not be blank " });
      return;
    } else {
      this.setState({ notificationComment: "" });
    }
    this.props.submitComment(
      this.state.name,
      this.state.email,
      this.state.comment,
      this.props.id_book
    );
    this.setState({ comment: "" });
  };
  submitOrder = () => {
    if (this.state.quantity < 0) {
      this.setState({ noti: false });
      return;
    } else {
      this.setState({ noti: true });
    }
    let product = this.props.productDetail;
    product.count = this.state.quantity;
    this.props.addToCart(product);
  };
  render() {
    return (
      <div className="container">
        <div>
          <div className="product-image-wrapper">
            <img src={this.imageUrl} alt="" className="product-image"/>
          </div>
          <div>
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
            <span>{this.props.productDetail.describe}</span>
          </div>
        </div>
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
  bookrelated: state.productReducers.product.bookrelated,
  comment: state.productReducers.product.comment,
});

export default connect(mapStateToProps, null)(ContentProductDetail);
