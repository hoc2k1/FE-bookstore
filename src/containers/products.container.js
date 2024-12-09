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
import { baseFilter } from '../constants/values'

class HomeContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const filterData = baseFilter
    if(this.props.location.search) {
      const searchURI = this.props.location.search[0] == '?' ? decodeURI(this.props.location.search.slice(1)) : decodeURI(this.props.location.search);
      searchURI.split('&').map((item, index) => {
        if (item.split('=') && item.split('=')[0] && item.split('=')[1]) {
          const key = item.split('=')[0]
          let listValue;
          if (item.split('=')[1].split(',,').length > 1) {
            listValue = item.split('=')[1].split(',,')
          }
          else listValue = item.split('=')[1]
          filterData[key] = listValue
        }
      })
    }
    this.props.productActions.setFilter(filterData)
    this.props.actions.auth()
    this.props.homeActions.getCategory()
    this.props.homeActions.getPublisher()
    this.props.homeActions.getAuthor()
    this.props.productActions.getAllBook()
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
            books={this.props.books}
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
            history={this.props.history}
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
  books: state.productReducers.product.books,
  totalpage: state.productReducers.product.totalpage,
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