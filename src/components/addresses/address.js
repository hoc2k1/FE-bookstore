import React from 'react'
import { addressForm } from '../../constants/values'
import FloatingInput from '../global/floating.input'
import Button from '../button/button'
import { PickerInput } from '../global/picker.input'

const Address = ({ onChangeField, state, saveAddress, isEditPage, onChangePickerField }) => {
  const title = isEditPage ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ'
  const renderForm = () => {
    return (
      <div className="signup-form py-md-3 my-2">
        { addressForm.map((item, index) => {
          if(item.type != 'picker') {
            return (
              <FloatingInput
                {...item}
                key={`address-${index}`}
                value={state.address.values[item.inputKey]}
                fieldStatus={state.address.checkValidate[item.inputKey]}
                password={item.inputKey == 'confirmPassword' ? state.address.values['password'] : ''}
                checkValidate={state.address.checkValidate[item.inputKey]}
                onChange={(inputKey, text, newInputStatus) => onChangeField(inputKey, text, newInputStatus)}/>
            )
          }
          else {
            let data = []
            if (item.inputKey == 'province') {
              data = state.pickerData.province;
            }
            else if (item.inputKey == 'district') {
              data = state.pickerData.district;
            }
            else {
              data = state.pickerData.commune;
            }
            return (
              <PickerInput 
                {...item}
                key={`address-${index}`}
                data={data}
                onChange={(inputKey, text) => onChangePickerField(inputKey, text)}
                value={state.address.values[item.inputKey]}
              />
            )
          }
        }) }
        <Button buttonStatus={state.address.buttonStatus} onClick={saveAddress}><span className="heading">Lưu thông tin</span></Button>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="d-flex p-0 width-small mx-auto header-login-register active align-items-center justify-content-center">
        <span className={`heading p-3 p-md-4 text-center`}>{title}</span>
      </div>
      {renderForm()}
    </div>
  )
}

export default Address