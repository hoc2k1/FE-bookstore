import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { loginForm, registerForm } from '../../constants/values';
import FloatingInput from '../global/floating.input';
import Button from '../button/button'
import Loading from '../loading/loading';

function LoginRegister({ onChangeFieldLogin, onChangeFieldRegister, state, registerSubmit, loginSubmit, loadingLoginRegister }) {
  const [login, setLogin] = useState(true);
  let xhtml = '';
  if (login) {
    xhtml =
      <div className='login-form'>
        { loginForm.map((item, index) => {
          return (
            <FloatingInput 
              {...item}
              key={`login-${index}`}
              value={state.login.values[item.inputKey]}
              checkValidate={state.login.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => onChangeFieldLogin(inputKey, text, newInputStatus)}/>
          )
        }) }
        <Button buttonStatus={state.login.buttonStatus} onClick={loginSubmit}>
          <span className="heading">Đăng nhập</span>
          <div className={`absolute-full bg-theme ${loadingLoginRegister ? 'd-flex' : 'd-none'}`}>
            <Loading isSmall={true}/>
          </div>
        </Button>
        <div className='forgotpassword mt-md-4 mt-3'>
          <Link to='/forgotpass' className="text-link">Quên mật khẩu?</Link>
        </div>
      </div>
  } else {
    xhtml = 
      <div className="signup-form">
        { registerForm.map((item, index) => {
          return (
            <FloatingInput 
              {...item}
              key={`register-${index}`}
              value={state.register.values[item.inputKey]}
              fieldStatus={state.register.checkValidate[item.inputKey]}
              password={item.inputKey == 'confirmPassword' ? state.register.values['password'] : ''}
              checkValidate={state.register.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => onChangeFieldRegister(inputKey, text, newInputStatus)}/>
          )
        }) }
        <Button buttonStatus={state.register.buttonStatus} onClick={registerSubmit}>
          <span className="heading">Đăng ký</span>
          <div className={`absolute-full bg-theme ${loadingLoginRegister ? 'd-flex' : 'd-none'}`}>
            <Loading isSmall={true}/>
          </div>
        </Button>
      </div>
  }
  return (
    <section className='homePage'>
      <div className="container login-register">
        <div className='menu-profile'>
          <ul className="d-flex p-0 normal-width-input mx-auto">
            <li className={`header-login-register flex-grow-1 d-flex justify-content-center ${login ? 'active' : ''}`}>
              <span onClick={() => {if (!login) setLogin(!login)}} className={`heading p-3 p-md-4 text-center ${login ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Đăng Nhập</span>
            </li>
            <li className={`header-login-register flex-grow-1 d-flex justify-content-center ${!login ? 'active' : ''}`}>
              <span onClick={() => {if (login) setLogin(!login)}} className={`heading p-3 p-md-4 text-center ${!login ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Đăng Ký</span>
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
export default LoginRegister