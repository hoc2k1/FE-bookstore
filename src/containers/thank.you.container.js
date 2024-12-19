import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ThankYou from "../components/thank.you/thank.you";
import * as userActions from '../actions/user.action'
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

class ThankYouContainer extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.search) {
      const queryParams = new URLSearchParams(this.props.location.search);
      this.idBill = queryParams.get('id_bill')
    }
  }
  async componentWillMount() {
    this.checkIsLogin = await this.props.actions.auth()
    
    if(!this.checkIsLogin) {
      this.props.history.push('/')
    }
  }
  render() {
    return (
      <div className="d-flex flex-column min-h-full">
        <Header history={this.props.history}/>
        <div className="d-flex flex-column flex-grow-1">
          <ThankYou idBill={this.idBill} history={this.props.history} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(ThankYouContainer);
