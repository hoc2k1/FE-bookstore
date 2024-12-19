import React from "react";
import { cartGridType } from "../../constants/values";
import PaymentAddress from "../payment/payment.address";
import PaymentMethod from "../payment/payment.method";
import CartGrid from "../cart/cart.grid";

const Bill = (props) => {
  return (
    <div className='container py-md-4 py-3'>
      <div>
        <span className='heading mb-2 mb-md-3'>Đơn hàng</span>
        <div className="mb-2 mb-md-3 px-md-3 px-2">
          <span><span className="heading-small">ID đơn hàng: </span><span>#{props.data._id}</span></span>
        </div>
      </div>
      <div>
        <span className='heading mb-2 mb-md-3'>Địa chỉ nhận hàng</span>
        <PaymentAddress type={cartGridType.bill} bill={props.data} history={props.history}/>
      </div>
      <div className='mt-3 mt-md-4'>
        <span className='heading mb-2 mb-md-3'>Phương thức thanh toán</span>
        <PaymentMethod bill={props.data}/>
      </div>
      <div className='mt-3 mt-md-4'>
        <span className='heading mb-2 mb-md-3'>Danh sách sản phẩm</span>
        <CartGrid products={props.data.products} id_bill={props.data._id} type={cartGridType.bill} history={props.history}/>
      </div>
    </div>
  )
}
export default Bill