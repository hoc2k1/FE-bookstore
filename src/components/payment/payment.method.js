import React from 'react'
import { paymentMethod } from '../../constants/values'

const PaymentMethod = (props) => {
  if(props.isPayment) {
    return (
      <div className='mt-2 mt-md-3 px-md-3 px-2'>
        <label className='d-flex align-items-center'>
          <input
            type="radio"
            name="options"
            value={paymentMethod.cod}
            checked={props.bill.payment_method == paymentMethod.cod}
            onChange={() => {}}
          />
          <span>&nbsp;{paymentMethod.cod}</span>
        </label>
      </div>
    )
  }
  else {
    return (
      <div className='mt-2 mt-md-3 px-md-3 px-2'>
        <label className='d-flex align-items-center'>
          <span>&nbsp;{paymentMethod.cod}</span>
        </label>
      </div>
    )
  }
}
export default PaymentMethod