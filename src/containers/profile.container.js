import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Profile from '../components/profile/profile'
import * as userActions from '../actions/user.action'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { inputStatus, profileForm, changePassForm  } from '../constants/values'
import storeConfig from '../config/storage.config'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: {
        values: {},
        checkValidate: [],
        buttonStatus: false
      },
      password: {
        values: {},
        checkValidate: [],
        buttonStatus: false
      }
    }
    profileForm.map((item) => {
      if (item.inputKey) {
        this.state.profile.values[item.inputKey] = ''
        if (item.isValidate) {
          this.state.profile.checkValidate[item.inputKey] = inputStatus.normal
        }
      }
    })
    changePassForm.map((item) => {
      if (item.inputKey) {
        this.state.password.values[item.inputKey] = ''
        if (item.isValidate) {
          this.state.password.checkValidate[item.inputKey] = inputStatus.normal
        }
      }
    })
  }
  async componentWillMount() {
    this.checkIsLogin = await this.props.actions.auth()
    if(!this.checkIsLogin) {
      this.props.history.push('/login_register')
    }
    else {
      const userData = storeConfig.getUser()
      const newProfileData = this.state.profile
      profileForm.map((item) => {
        newProfileData.values[item.inputKey] = userData[item.inputKey]
      })
      newProfileData.buttonStatus = true;
      this.setState({profile: newProfileData})
    }
  }

  onChangeFieldChangePass(inputKey, text, newInputStatus) {
    const newPasswordState = this.state.password;
    newPasswordState.values[inputKey] = text;
    newPasswordState.checkValidate[inputKey] = newInputStatus;
    let checkButtonStatus = true
    changePassForm.map((item) => {
      if (item.isValidate && newPasswordState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newPasswordState.checkValidate[item.inputKey] == inputStatus.normal && this.state.password.values[item.inputKey])) {
          checkButtonStatus = false
        }
      }
    })
    newPasswordState.buttonStatus = checkButtonStatus
    this.setState({password: newPasswordState})
  }
  onChangeFieldProfile(inputKey, text, newInputStatus) {
    const newProfileState = this.state.profile;
    newProfileState.values[inputKey] = text;
    newProfileState.checkValidate[inputKey] = newInputStatus;
    let checkButtonStatus = true
    profileForm.map((item) => {
      if (item.isValidate && newProfileState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newProfileState.checkValidate[item.inputKey] == inputStatus.normal && this.state.profile.values[item.inputKey])) {
          checkButtonStatus = false
        }
      }
    })
    newProfileState.buttonStatus = checkButtonStatus
    this.setState({profile: newProfileState})
  }
  changePassSubmit = async () => {
    await this.props.actions.changePassword(this.state.password.values);
  }

  editProfileSubmit = async () => {
    await this.props.actions.updateProfile(this.state.profile.values);
  }
  render() {
    return (
      <div>
        <Header history={this.props.history}/>
        <Profile
          onChangeFieldChangePass={(inputKey, text, newInputStatus) => this.onChangeFieldChangePass(inputKey, text, newInputStatus)}
          onChangeFieldProfile={(inputKey, text, newInputStatus) => this.onChangeFieldProfile(inputKey, text, newInputStatus)}
          changePassSubmit={() => this.changePassSubmit()}
          editProfileSubmit={() => this.editProfileSubmit()}
          state={this.state}
        />
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
)(ProfileContainer)