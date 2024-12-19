import React from 'react'
import CartGrid from './cart.grid'
import { cartGridType } from '../../constants/values'

const Cart = (props) => {
  return (
    <div className='container py-md-4 py-3'>
      <CartGrid type={cartGridType.cart} history={props.history}/>
    </div>
  )
}
export default Cart