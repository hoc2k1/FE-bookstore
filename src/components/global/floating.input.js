import React, {useEffect} from "react";
import { inputStatus } from "../../constants/values";

const FloatingInput = ({ inputKey, type, placeholder, onChange, 
  password, isValidate, value, required, label, fieldStatus,
  errorMessage, checkValidate, isDisabled }) => {
  const validate = (text) => {
    let newInputStatus = inputStatus.normal
    if (isValidate) {
      switch (inputKey) {
        case 'email': 
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          newInputStatus = emailRegex.test(text) ? inputStatus.success : inputStatus.error
          break;
        case 'password':
        case 'oldPassword':
        case 'newPassword':
          newInputStatus = text.length >= 6 ? inputStatus.success : inputStatus.error
          break;
        case 'confirmPassword':
          newInputStatus = text == password ? inputStatus.success : inputStatus.error
          break;
        case 'phone':
        case 'phoneNumber':
          const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
          newInputStatus = phoneRegex.test(text) ? inputStatus.success : inputStatus.error
          break;
        default: 
          newInputStatus = text.length >= 1 ? inputStatus.success : inputStatus.error
      }
    }
    onChange(inputKey, text, newInputStatus)
  }

  useEffect(() => {
    if (inputKey == 'confirmPassword' && fieldStatus != inputStatus.normal ) {
      validate(value)
    }
  }, [password])
  
  return (
    <div className="d-flex flex-column normal-width-input mt-2">
      {label && (<label className={`${required ? 'required' : ''}`}>{label}</label>)}
      <input type={type || 'text'}
        className={`border p-2 ${isDisabled ? 'input-disabled' : ''}`}
        disabled={isDisabled}
        placeholder={placeholder}
        value={value || ''}
        required={required}
        onChange={(e) => {
          validate(e.target.value)
        }}
      />
      <span className={`input-message-error ${checkValidate == inputStatus.error ? 'show' : '' }`}>{errorMessage || 'Error message'}</span>
    </div>
  )
}

export default FloatingInput