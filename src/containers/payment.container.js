import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Payment from "../components/payment/payment";
import * as userActions from "../actions/user.action";
import * as cartActions from '../actions/cart.action'
import * as homeActions from '../actions/home.action'
import * as billActions from '../actions/bill.action'
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { checkNotEmpty } from "../config/identify";
import Loading from "../components/loading/loading";
class PaymentContainer extends Component {
  async componentWillMount() {
    this.checkIsLogin = await this.props.actions.auth()
    if(!this.checkIsLogin) {
      this.props.history.push('/login_register')
    }
    else {
      this.props.actions.getAllAddresses()
      this.props.billActions.findOrAdd()
      this.props.homeActions.getCategory()
      this.props.homeActions.getPublisher()
      this.props.homeActions.getAuthor()
    }
  }
  render() {
    const { addresses, bill } = this.props
    if (addresses && checkNotEmpty(bill)) {
      return (
        <div className="d-flex flex-column min-h-full">
          <Header history={this.props.history}/>
          <div className="d-flex flex-column flex-grow-1">
            <Payment history={this.props.history} />
          </div>
          <Footer />
        </div>
      );
    }
    else {
      return (
        <Loading isFull={true}/>
      )
    }
  }
}

const mapStateToProps = state => ({
  addresses: state.userReducers.user.addresses,
  bill: state.billReducers.bill.data
})

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    billActions: bindActionCreators(billActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);
