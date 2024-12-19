import React from 'react'
import FloatingInput from '../global/floating.input';
import Button from '../button/button'

function LoginRegister({ onChangeField, forgotPassSubmit, state }) {
  return (
		<div className="container">
			<div className="d-flex p-0 width-small mx-auto header-login-register active align-items-center justify-content-center">
        <span className={`heading p-3 p-md-4 text-center`}>Quên mật khẩu</span>
      </div>
			<div className='login-form'>
				<FloatingInput
					inputKey={'email'}
					type={'type'}
					isValidate={true}
					required={true}
					errorMessage="Email không hợp lệ"
					label={'Email'}
					value={state.forgotPass.values['email']}
					fieldStatus={state.forgotPass.checkValidate['email']}
					checkValidate={state.forgotPass.checkValidate['email']}
					onChange={(inputKey, text, newInputStatus) => onChangeField(inputKey, text, newInputStatus)}/>
				<Button buttonStatus={state.forgotPass.buttonStatus} onClick={forgotPassSubmit}>
					<span className="heading">Quên mật khẩu</span>
				</Button>
			</div>
		</div>
  );
}
export default LoginRegister