import React from 'react'
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
import { baseFilter, keyFilter } from '../constants/values'

class HomeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      disableFilter: '',
      urlParam: {
        key: null,
        value: null
      }
    }
  }
  componentWillMount() {
    const filterData = baseFilter
    const arrayDisableFilter = [keyFilter.SEARCH_AUTHOR, keyFilter.SEARCH_CATEGORY, keyFilter.SEARCH_PUBLISHER]
    if(this.props.location.search) {
      const searchURI = this.props.location.search[0] === '?' ? decodeURI(this.props.location.search.slice(1)) : decodeURI(this.props.location.search);
      searchURI.split('&').map((item, index) => {
        if (item.split('=') && item.split('=')[0] && item.split('=')[1]) {
          const key = item.split('=')[0]
          if (arrayDisableFilter.includes(key)) {
            this.state.disableFilter = key
          }
          let listValue;
          if (item.split('=')[1].split(',,').length > 1) {
            listValue = item.split('=')[1].split(',,')
          }
          else listValue = item.split('=')[1]
          filterData[key] = listValue
          if (key !== 'page') {
            this.state.urlParam = {
              key: key,
              value: listValue
            }
          }
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

  render() {
    const { category, publisher, books, totalpage } = this.props
    if (category && publisher && books && totalpage) {
      return (
        <div className="overflow-auto d-flex flex-column min-h-full">
          <Header history={this.props.history}/>
          <div className="d-flex flex-column flex-grow-1">
            <Breadcrumb history={this.props.history}/>
            <Products history={this.props.history} disableFilter={this.state.disableFilter} urlParam={this.state.urlParam}/>
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
  banner: state.homeReducers.banner.data,
  author: state.homeReducers.author.data,
  books: state.productReducers.product.books,
  totalpage: state.productReducers.product.totalpage
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