import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Bill from "../components/bills/bill";
import * as userActions from '../actions/user.action'
import * as billActions from '../actions/bill.action'
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Loading from "../components/loading/loading";

class BillContainer extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.search) {
      const queryParams = new URLSearchParams(this.props.location.search);
      this.id = queryParams.get('id')
    }
    this.state = {
      data: null
    }
  }
  async componentWillMount() {
    this.checkIsLogin = await this.props.actions.auth()
    
    if(!this.checkIsLogin) {
      this.props.history.push('/')
    }
    const data = await this.props.billActions.findById(this.id)
    this.setState({data: data})
  }
  render() {
    if (this.state.data) {
      return (
        <div className="d-flex flex-column min-h-full">
          <Header history={this.props.history}/>
          <div className="d-flex flex-column flex-grow-1">
            <Bill data={this.state.data} history={this.props.history} />
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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    billActions: bindActionCreators(billActions, dispatch)
  };
};
export default connect(null, mapDispatchToProps)(BillContainer);
