import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../actions/user.action'
import * as billActions from '../actions/bill.action'
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Loading from "../components/loading/loading";
import Bills from "../components/bills/bills";

class BillContainer extends Component {
  constructor(props) {
    super(props);
    this.props.billActions.getBillByUser()
  }
  async componentWillMount() {
    this.checkIsLogin = await this.props.actions.auth()
    
    if(!this.checkIsLogin) {
      this.props.history.push('/')
    }
  }
  render() {
    if (this.props.bills) {
      return (
        <div className="d-flex flex-column min-h-full">
          <Header history={this.props.history}/>
          <div className="d-flex flex-column flex-grow-1">
            <Bills history={this.props.history} />
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
  bills: state.billReducers.bill.bills
})
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    billActions: bindActionCreators(billActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BillContainer);
