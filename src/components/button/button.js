import React from "react"

const Button = ({
  children, onClick, customButton
 }) => {
  return (
    <div className={`button cursor-pointer ${customButton}`} onClick={onClick}>
      <div className='button-content'>
        {children}
      </div>
    </div>
  )
}
export default Button