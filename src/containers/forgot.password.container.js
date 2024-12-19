import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ForgotPassword from '../components/fogot.password/forgot.password'
import * as userActions from '../actions/user.action'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { inputStatus } from '../constants/values'
import toast from 'react-hot-toast'
class ForgotPasswordContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      forgotPass: {
        values: {
          email: ''
        },
        checkValidate: {
          email: inputStatus.normal
        },
        buttonStatus: false
      },
    }
  }

  onChangeField(inputKey, text, newInputStatus) {
    const newForgotPassState = this.state.forgotPass;
    newForgotPassState.values[inputKey] = text;
    newForgotPassState.checkValidate[inputKey] = newInputStatus;
    let checkButtonStatus = true
    if (newForgotPassState.checkValidate[inputKey] == inputStatus.error) {
      checkButtonStatus = false
    }
    newForgotPassState.buttonStatus = checkButtonStatus
    this.setState({forgotPass: newForgotPassState})
  }
  componentWillMount() {
    this.props.actions.auth()
  }

  forgotPassSubmit = async () => {
    toast.success("Vui lòng kiểm tra email để cập nhật mật khẩu!")
  }
  render() {
    return (
      <div className="d-flex flex-column min-h-full">
        <Header history={this.props.history}/>
        <div className="d-flex flex-column flex-grow-1">
          <ForgotPassword
            onChangeField={(inputKey, text, newInputStatus) => this.onChangeField(inputKey, text, newInputStatus)}
            forgotPassSubmit={() => this.forgotPassSubmit()}
            state={this.state}
          />
        </div>
        <Footer />
      </div>
    )

  }
}
const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators(userActions, dispatch),
  })
}
export default connect(
  null,
  mapDispatchToProps,
)(ForgotPasswordContainer)