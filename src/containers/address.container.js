import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Address from '../components/addresses/address'
import * as userActions from '../actions/user.action'
import Loading from '../components/loading/loading'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { checkNotEmpty } from '../config/identify'
import { addressForm, inputStatus } from '../constants/values'
import addressData from '../address.json'

class AddressContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: {
        values: {},
        checkValidate: {},
        buttonStatus: false
      },
      pickerData: {
        province: this.sortPickerData('province'),
        district: [],
        commune: []
      }
    }
    if (this.props.location.search) {
      const queryParams = new URLSearchParams(this.props.location.search);
      this.idAddress = queryParams.get('id')
      this.from = queryParams.get('from')
    }
    addressForm.map((item) => {
      if (item.inputKey) {
        this.state.address.values[item.inputKey] = ''
        if (item.isValidate) {
          this.state.address.checkValidate[item.inputKey] = inputStatus.normal
        }
      }
    })
  }
  sortPickerData = (key, newProvince, newDistrict) => {
    const province = newProvince || this.state?.address?.values?.province
    const district = newDistrict || this.state?.address?.values?.district
    let newData = []
    if (key == 'province') {
      addressData.data.map((item) => {
        newData.push({label: item.name, value: item.name})
      })
      newData = newData.sort((a, b) => a.label.localeCompare(b.label))
    }
    else if (key == 'district') {
      const dataProvinces = addressData.data.filter(item => item.name == province)
      if (checkNotEmpty(dataProvinces)) {
        dataProvinces[0].level2s.map((item) => {
          newData.push({label: item.name, value: item.name})
        })
        newData = newData.sort((a, b) => a.label.localeCompare(b.label))
      }
    }
    else {
      const dataProvinces = addressData.data.filter(item => item.name == province)
      if (checkNotEmpty(dataProvinces)) {
        const dataDistricts = dataProvinces[0].level2s.filter(item => item.name == district)
        if(checkNotEmpty(dataDistricts)) {
          dataDistricts[0].level3s.map((item) => {
            newData.push({label: item.name, value: item.name})
          })
          newData = newData.sort((a, b) => a.label.localeCompare(b.label))
        }
      }
    }
    return newData
  }
  async componentWillMount() {
    this.checkIsLogin = await this.props.actions.auth()
    if(!this.checkIsLogin) {
      this.props.history.push('/login_register')
    }
    else {
      this.props.actions.getAllAddresses()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addresses && nextProps.addresses != this.props.address && this.idAddress) {
      const filterItems = nextProps.addresses.filter(item => item._id == this.idAddress)
      if(checkNotEmpty(filterItems)) {
        this.isEditPage = true;
        addressForm.map((item) => {
          this.state.address.values[item.inputKey] = filterItems[0][item.inputKey]
          if (item.type == 'picker') {
            this.state.pickerData[item.inputKey] = this.sortPickerData(item.inputKey)
          }
        })
        this.state.address.buttonStatus = this.checkButtonStatus(this.state.address)
      }
    }
  }

  checkButtonStatus(newAddressState) {
    let checkStatus = true
    addressForm.map((item) => {
      if (item.isValidate && newAddressState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newAddressState.checkValidate[item.inputKey] == inputStatus.normal && this.state.address.values[item.inputKey])) {
          checkStatus = false
        }
      }
    })
    return checkStatus
  }

  onChangeField(inputKey, text, newInputStatus) {
    const newAddressState = this.state.address;
    newAddressState.values[inputKey] = text;
    newAddressState.checkValidate[inputKey] = newInputStatus;
    
    newAddressState.buttonStatus = this.checkButtonStatus(newAddressState)
    this.setState({address: newAddressState})
  }

  onChangePickerField(inputKey, text) {
    if (text != this.state.address.values[inputKey]) {
      const newAddressState = this.state.address;
      const newPickerData = this.state.pickerData;
      if (inputKey == 'province') {
        newAddressState.values[inputKey] = text;
        newAddressState.checkValidate[inputKey] = inputStatus.success;
  
        newAddressState.values['district'] = '';
        newAddressState.checkValidate['district'] = inputStatus.error;
        newAddressState.values['commune'] = '';
        newAddressState.checkValidate['commune'] = inputStatus.error;
  
        newPickerData['district'] = this.sortPickerData('district', text);
        newPickerData['commune'] = [];
      }
      else if (inputKey == 'district') {
        newAddressState.values[inputKey] = text;
        newAddressState.checkValidate[inputKey] = inputStatus.success;
  
        newAddressState.values['commune'] = '';
        newAddressState.checkValidate['commune'] = inputStatus.error;
  
        newPickerData['commune'] = this.sortPickerData('commune', null, text);
      }
      else {
        newAddressState.values[inputKey] = text;
        newAddressState.checkValidate[inputKey] = inputStatus.success;
      }
  
      newAddressState.buttonStatus = this.checkButtonStatus(newAddressState)
      this.setState({address: newAddressState, pickerData: newPickerData})
    }
  }

  saveAddress = async () => {
    const data = this.state.address.values
    if(this.isEditPage) {
      data.id = this.idAddress
      const isSuccess = await this.props.actions.editAddress(data)
      if (isSuccess) {
        this.props.history.push('/addresses')
      }
    }
    else {
      const isSuccess = await this.props.actions.addNewAddress(data)
      if (isSuccess) {
        if (this.from) {
          this.props.history.push('/payment')
        }
        else {
          this.props.history.push('/addresses')
        }
      }
    }
  }

  
  render() {
    const { addresses } = this.props
    if (addresses) {
      return (
        <div className="d-flex flex-column min-h-full">
          <Header history={this.props.history}/>
          <div className="d-flex flex-column flex-grow-1">
            <Address 
              history={this.props.history}
              state={this.state}
              isEditPage={this.isEditPage}
              onChangeField={(inputKey, text, newInputStatus) => this.onChangeField(inputKey, text, newInputStatus)}
              onChangePickerField={(inputKey, text) => this.onChangePickerField(inputKey, text)}
              saveAddress={() => this.saveAddress()}
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
)(AddressContainer)