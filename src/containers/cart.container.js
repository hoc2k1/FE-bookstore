import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Cart from "../components/cart/cart";
import * as userActions from "../actions/user.action";
import * as cartActions from '../actions/cart.action'
import * as homeActions from '../actions/home.action'
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
class CartContainer extends Component {
  componentWillMount() {
    this.props.actions.auth()
    this.props.cartActions.getCart()
    this.props.homeActions.getCategory()
    this.props.homeActions.getPublisher()
    this.props.homeActions.getAuthor()
  }
  render() {
    return (
      <div className="d-flex flex-column min-h-full">
        <Header history={this.props.history}/>
        <div className="d-flex flex-column flex-grow-1">
          <Cart history={this.props.history}/>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};
export default connect(null, mapDispatchToProps)(CartContainer);
