import React from 'react'
import CartGrid from '../cart/cart.grid'
import { cartGridType } from '../../constants/values'
import { connect } from 'react-redux'
import PaymentAddress from './payment.address'
import PaymentMethod from './payment.method'

const Payment = (props) => {
  return (
    <div className='container py-md-4 py-3'>
      <div>
        <span className='heading mb-2 mb-md-3'>Địa chỉ nhận hàng</span>
        <PaymentAddress type={cartGridType.payment} bill={props.bill} history={props.history}/>
      </div>
      <div className='mt-3 mt-md-4'>
        <span className='heading mb-2 mb-md-3'>Phương thức thanh toán</span>
        <PaymentMethod bill={props.bill} isPayment={true}/>
      </div>
      <div className='mt-3 mt-md-4'>
        <span className='heading mb-2 mb-md-3'>Danh sách sản phẩm</span>
        <CartGrid products={props.bill.products} id_bill={props.bill._id} type={cartGridType.payment} history={props.history}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  bill: state.billReducers.bill.data
})
export default connect(mapStateToProps, null)(Payment)