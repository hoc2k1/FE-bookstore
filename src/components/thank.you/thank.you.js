import React from 'react'
import Button from '../button/button'

const ThankYou = (props) => {
  return (
    <div className={`h-100 w-100 flex-grow-1 d-flex align-items-center justify-content-center flex-column`}>
      <div>
        <i className='fa fa-check-circle icon-success'></i>
      </div>
      <div className='mt-md-3 mt-2'>
        <span className='heading'>Thanh toán thành công</span>
      </div>
      <div className='mt-md-3 mt-2 cursor-pointer p-md-3 p-2 border' onClick={() => props.history.push({pathname: 'bill', search: `?id=${props.idBill}`})}>
        <span><span className='heading-small'>Id đơn hàng: </span><span>#{props.idBill}</span></span>
      </div>
      <div className='mt-md-3 mt-2'>
        <Button onClick={() => props.history.push('/')}>
          <span className='heading-small'>Tiếp tục mua sắm</span>
        </Button>
      </div>
    </div>
  )
}
export default ThankYou