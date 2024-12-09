import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Products from '../components/products/products'
import * as userActions from '../actions/user.action'
import * as homeActions from '../actions/home.action'
import * as productActions from '../actions/product.action'
import Loading from '../components/loading/loading'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Breadcrumb from '../components/header/breadcrumd'

class HomeContainer extends React.Component {
  constructor(props) {
    super(props)

  }
  componentWillMount() {
    this.props.actions.auth()
    this.props.homeActions.getCategory()
    this.props.homeActions.getBanner()
    this.props.homeActions.getPublisher()
    this.props.homeActions.getBook()
    this.props.homeActions.getAuthor()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.props.homeActions.getBook()
    }
  }

  render() {
    const { category, publisher, book, totalpage } = this.props
    if (category !== null && publisher !== null && book !== null && totalpage !== null) {
      return (
        <div>
          <Header history={this.props.history}/>
          <Breadcrumb history={this.props.history}/>
          <Products
            category={this.props.category}
            publisher={this.props.publisher}
            banner={this.props.banner}
            book={this.props.book}
            totalpage={this.props.totalpage}
            backPage={() => this.props.homeActions.backPage()}
            nextPage={() => this.props.homeActions.nextPage()}
            setPage={(page) => this.props.homeActions.setPage(page)}
            page={this.props.page}
            sortType={this.props.sortType}
            setSortType={(value) => this.props.homeActions.setSortType(value)}
            setRangeType={(range) => this.props.homeActions.setRangeType(range)}
            title={this.props.title}
            setTitle={(title) => this.props.homeActions.setTitle(title)}
            setBranch={(branch) => this.props.homeActions.setBranch(branch)}
            branch={this.props.branch}
            setSearchText={(value) => this.props.homeActions.setSearchText(value)}
            author={this.props.author}
            setIDBranch={(id) => this.props.homeActions.setIDBranch(id)}
            branchClick={(branch, id) => this.props.homeActions.branchClick(branch, id)}
            history={this.props.history}
            searchTextSubmit={() => this.props.homeActions.searchTextSubmit()}
            addToCart={(product) => this.props.productActions.addToCart(product)}
          />
          <Footer />
        </div>
      )
    }
    else {
      return (
        <Loading />
      )
    }
  }
}
const mapStateToProps = state => ({
  category: state.homeReducers.category.data,
  publisher: state.homeReducers.publisher.data,
  banner: state.homeReducers.banner.data,
  author: state.homeReducers.author.data,
  book: state.homeReducers.book.data,
  totalpage: state.homeReducers.book.totalpage,
  page: state.homeReducers.book.page,
  sortType: state.homeReducers.book.sortType,
  title: state.homeReducers.book.title,
  branch: state.homeReducers.book.branch
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
  mapDispatchToProps
)(HomeContainer)