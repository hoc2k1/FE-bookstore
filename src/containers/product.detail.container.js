import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductDetail from '../components/product.detail/product.detail'
import * as productActions from '../actions/product.action'
import * as homeActions from '../actions/home.action'
import * as userActions from '../actions/user.action'
import Loading from '../components/loading/loading'
import { checkEmpty } from '../config/identify'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'

class ProductDetailContainer extends Component {
  componentWillMount() {
    this.props.actions.auth()
    this.props.homeActions.getCategory()
    this.props.homeActions.getPublisher()
    this.props.homeActions.getAuthor()
    this.props.productActions.getBookDetail(this.props.match.params.id)
    this.props.productActions.getBookRelated(this.props.match.params.id)
    this.props.productActions.getCommentByIDBook(this.props.match.params.id)
  }

  render() {
    if (checkEmpty(this.props.productDetail) && checkEmpty(this.props.category) && checkEmpty(this.props.author) && checkEmpty(this.props.publisher) ) {
      return (
        <div className="overflow-auto d-flex flex-column min-h-full">
          <Header history={this.props.history}/>
          <div className="d-flex flex-column flex-grow-1">
            <ProductDetail
              category={this.props.category}
              publisher={this.props.publisher}
              productDetail={this.props.productDetail}
              nameCategory={this.props.category.filter(item => item._id == this.props.productDetail.id_category)[0].name}
              namePublisher={this.props.publisher.filter(item => item._id == this.props.productDetail.id_nsx)[0].name}
              nameAuthor={this.props.author.filter(item => item._id == this.props.productDetail.id_author)[0].name}
              
              islogin={this.props.islogin}
              bookrelated={this.props.bookrelated}
              id_book={this.props.match.params.id}
              submitComment={(name, email, comment, id_book) => this.props.productActions.submitComment(name, email, comment, id_book)}
              comment={this.props.comment}
              addToCart={(product) => this.props.productActions.addToCart(product)}
              history={this.props.history}
            />
          </div>
          <Footer />
        </div>
      )
    }
    else {
      return (
        <Loading isFull={true}/>
      )
    }

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
})
const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators(userActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  })
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailContainer)