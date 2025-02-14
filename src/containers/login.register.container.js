import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginRegister from '../components/login.register/login.register'
import * as userActions from '../actions/user.action'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { inputStatus, loginForm, registerForm  } from '../constants/values'
class LoginRegisterContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: {
        values: [],
        checkValidate: [],
        buttonStatus: false
      },
      register: {
        values: [],
        checkValidate: [],
        buttonStatus: false
      }
    }
    if (this.props.location.search) {
      const queryParams = new URLSearchParams(this.props.location.search);
      this.from = queryParams.get('from')
    }
    loginForm.map((item) => {
      if (item.inputKey) {
        this.state.login.values[item.inputKey] = ''
        if (item.isValidate) {
          this.state.login.checkValidate[item.inputKey] = inputStatus.normal
        }
      }
    })
    registerForm.map((item) => {
      if (item.inputKey) {
        this.state.register.values[item.inputKey] = ''
        if (item.isValidate) {
          this.state.register.checkValidate[item.inputKey] = inputStatus.normal
        }
      }
    })
  }

  onChangeFieldLogin(inputKey, text, newInputStatus) {
    const newLoginState = this.state.login;
    newLoginState.values[inputKey] = text;
    newLoginState.checkValidate[inputKey] = newInputStatus;
    let checkButtonStatus = true
    loginForm.map((item) => {
      if (item.isValidate && newLoginState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newLoginState.checkValidate[item.inputKey] == inputStatus.normal && this.state.login.values[item.inputKey])) {
          checkButtonStatus = false
        }
      }
    })
    newLoginState.buttonStatus = checkButtonStatus
    this.setState({login: newLoginState})
  }
  onChangeFieldRegister(inputKey, text, newInputStatus) {
    const newRegisterState = this.state.register;
    newRegisterState.values[inputKey] = text;
    newRegisterState.checkValidate[inputKey] = newInputStatus;
    let checkButtonStatus = true
    registerForm.map((item) => {
      if (item.isValidate && newRegisterState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newRegisterState.checkValidate[item.inputKey] == inputStatus.normal && this.state.register.values[item.inputKey])) {
          checkButtonStatus = false
        }
      }
    })
    newRegisterState.buttonStatus = checkButtonStatus
    this.setState({register: newRegisterState})
  }
  componentWillMount() {
    this.props.actions.auth()
  }
  registerSubmit = async () => {
    const registerSuccess = await this.props.actions.register(this.state.register.values)
    if (registerSuccess) {
      setTimeout(() => {
        if (this.from) {
          this.props.history.push('/cart')
        }
        else {
          this.props.history.push('/')
        }
      }, 1000)
    }
  }

  loginSubmit = async () => {
    const loginSuccess = await this.props.actions.login(this.state.login.values)
    if (loginSuccess) {
      setTimeout(() => {
        if (this.from) {
          this.props.history.push('/cart')
        }
        else {
          this.props.history.push('/')
        }
      }, 1000)
    }
  }
  render() {
    return (
      <div className="d-flex flex-column min-h-full">
        <Header history={this.props.history}/>
        <div className="d-flex flex-column flex-grow-1">
          <LoginRegister
            onChangeFieldLogin={(inputKey, text, newInputStatus) => this.onChangeFieldLogin(inputKey, text, newInputStatus)}
            onChangeFieldRegister={(inputKey, text, newInputStatus) => this.onChangeFieldRegister(inputKey, text, newInputStatus)}
            registerSubmit={() => this.registerSubmit()}
            loginSubmit={() => this.loginSubmit()}
            loadingLoginRegister={this.props.loadingLoginRegister}
            state={this.state}
          />
        </div>
        <Footer />
      </div>
    )

  }
}
const mapStateToProps = state => ({
  loadingLoginRegister: state.userReducers.login.loadingLoginRegister
})
const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators(userActions, dispatch),
  })
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginRegisterContainer)