import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Addresses from '../components/addresses/addresses'
import * as userActions from '../actions/user.action'
import Loading from '../components/loading/loading'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { checkNotEmpty } from '../config/identify'

class AddressesContainer extends Component {
  async componentWillMount() {
    this.checkIsLogin = await this.props.actions.auth()
    if(!this.checkIsLogin) {
      this.props.history.push('/login_register')
    }
    else {
      this.props.actions.getAllAddresses()
    }
  }

  render() {
    const { addresses } = this.props
    if (checkNotEmpty(addresses)) {
      return (
        <div className="d-flex flex-column min-h-full">
          <Header history={this.props.history}/>
          <div className="d-flex flex-column flex-grow-1">
            <Addresses history={this.props.history}/>
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
  addresses: state.userReducers.user.addresses
})

const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators(userActions, dispatch)
  })
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressesContainer)