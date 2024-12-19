import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Home from '../components/home/home'
import * as userActions from '../actions/user.action'
import * as homeActions from '../actions/home.action'
import Loading from '../components/loading/loading'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'

class HomeContainer extends Component {
  componentWillMount() {
    this.props.actions.auth()
    this.props.homeActions.getCategory()
    this.props.homeActions.getBanner()
    this.props.homeActions.getBook()
  }

  render() {
    const { category, banner, totalpage } = this.props
    if (category && banner && totalpage ) {
      return (
        <div className="d-flex flex-column min-h-full">
          <Header history={this.props.history}/>
          <div className="d-flex flex-column flex-grow-1">
            <Home
              category={this.props.category}
              banner={this.props.banner}
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
  banner: state.homeReducers.banner.data,
  totalpage: state.homeReducers.book.totalpage
})

const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators(userActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch)
  })
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)