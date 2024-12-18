import React from "react"

const Button = ({
  children, onClick, customButton, buttonStatus = true
 }) => {
  return (
    <div className={`button position-relative ${buttonStatus ? 'active cursor-pointer' : 'cursor-not-allowed'} ${customButton}`} onClick={() => buttonStatus ? onClick() : null}>
      <div className='button-content'>
        {children}
      </div>
    </div>
  )
}
export default Button