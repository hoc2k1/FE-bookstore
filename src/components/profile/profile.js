import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { profileForm, changePassForm } from '../../constants/values';
import FloatingInput from '../global/floating.input';
import Button from '../button/button'

function Profile({ onChangeFieldChangePass, onChangeFieldProfile, state, changePassSubmit, editProfileSubmit }) {
  const [profile, setProfile] = useState(true);
  let xhtml = '';
  if (profile) {
    xhtml =
      <div className='login-form'>
        { profileForm.map((item, index) => {
          return (
            <FloatingInput 
              {...item}
              key={`profile-${index}`}
              isDisable={item.isDisabled}
              value={state.profile.values[item.inputKey]}
              checkValidate={state.profile.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => onChangeFieldProfile(inputKey, text, newInputStatus)}/>
          )
        }) }
        <Button buttonStatus={state.profile.buttonStatus} onClick={editProfileSubmit}><span className="heading">Lưu thông tin</span></Button>
      </div>
  } else {
    xhtml = 
      <div className="signup-form">
        { changePassForm.map((item, index) => {
          return (
            <FloatingInput 
              {...item}
              key={`password-${index}`}
              value={state.password.values[item.inputKey]}
              fieldStatus={state.password.checkValidate[item.inputKey]}
              password={item.inputKey == 'confirmPassword' ? state.password.values['newPassword'] : ''}
              checkValidate={state.password.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => onChangeFieldChangePass(inputKey, text, newInputStatus)}/>
          )
        }) }
        <Button buttonStatus={state.password.buttonStatus} onClick={changePassSubmit}><span className="heading">Đổi mật khẩu</span></Button>
      </div>
  }
  return (
    <section className='homePage'>
      <div className="container">
        <div className='menu-profile'>
          <ul className="d-flex p-0 normal-width-input mx-auto">
            <li className={`header-login-register flex-grow-1 d-flex justify-content-center ${profile ? 'active' : ''}`}>
              <span onClick={() => {if (!profile) setProfile(!profile)}} className={`heading p-3 p-md-4 text-center ${profile ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Thông tin tài khoản</span>
            </li>
            <li className={`header-login-register flex-grow-1 d-flex justify-content-center ${!profile ? 'active' : ''}`}>
              <span onClick={() => {if (profile) setProfile(!profile)}} className={`heading p-3 p-md-4 text-center ${!profile ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Đổi mật khẩu</span>
            </li>
          </ul>
        </div>
        <div>
          {xhtml}
        </div>
      </div>
    </section>
  );
}
export default Profile