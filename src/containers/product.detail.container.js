import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductDetail from '../components/product.detail/product.detail'
import * as productActions from '../actions/product.action'
import * as homeActions from '../actions/home.action'
import * as userActions from '../actions/user.action'
import Loading from '../components/loading/loading'
import { checkNotEmpty } from '../config/identify'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Breadcrumb from '../components/header/breadcrumd'

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
    if (checkNotEmpty(this.props.productDetail) && checkNotEmpty(this.props.category) && checkNotEmpty(this.props.author) && checkNotEmpty(this.props.publisher) ) {
      return (
        <div className="d-flex flex-column min-h-full">
          <Header history={this.props.history}/>
          <div className="d-flex flex-column flex-grow-1">
            <Breadcrumb history={this.props.history}/>
            <ProductDetail />
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