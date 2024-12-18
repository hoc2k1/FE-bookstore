import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../actions/cart.action'
import ProductCard from '../products/product.card'
import Price from '../product.detail/product.price'
import { currency } from '../../constants/values'
import Button from '../button/button'

const Cart = (props) => {
  const renderHeader = () => {
    return (
      <div className='row secondary-bg'>
        <div className='col-6 px-md-3 px-1 d-flex justify-content-center align-items-center'>
          <span className='heading color-theme'>Sản phẩm</span>
        </div>
        <div className='col-3 px-md-3 px-1 d-flex justify-content-center align-items-center'>
          <span className='heading color-theme'>Số lượng</span>
        </div>
        <div className='col-2 px-md-3 px-1 d-flex justify-content-center align-items-center'>
          <span className='heading color-theme'>Số tiền</span>
        </div>
        <div className='col-1 px-md-3 px-1 d-flex justify-content-center align-items-center'>
          <span className='heading color-theme'></span>
        </div>
      </div>
    )
  }
  const decreaseQty = (item) => {
    if (item.count != 1) {
      const newItem = item
      newItem.count -= 1;
      props.cartActions.updateProductInCart(newItem)
    }
  }
  const increaseQty = (item) => {
    const newItem = item
    newItem.count += 1;
    props.cartActions.updateProductInCart(newItem)
  }
  const deleteProductInCart = (item) => {
    props.cartActions.deleteProductInCart(item._id)
  }
  
  const renderItem = (item, index) => {
    return (
      <div className='row border-bottom' key={`cart-item-${index}`}>
        <div className='col-6 px-md-3 px-1 d-flex justify-content-center align-items-center'>
          <ProductCard product={item} isCart={true}/>
        </div>
        <div className='col-3 px-md-3 px-1 d-flex justify-content-center align-items-center'>
          <i 
            onClick={() => decreaseQty(item)}
            className={`fa fa-minus border width-qty height-qty justify-content-center align-items-center d-flex ${item.count == 1 ? 'input-disabled cursor-not-allow' : 'cursor-pointer'}`}
          ></i>
          <div className='flex-grow-1 flex-md-grow-0 height-qty'>
            <input
              type="number"
              disabled
              id=""
              name=""
              value={item.count}
              className={`border qty-cart-input height-qty px-2 px-md-3`}
            />
          </div>
          <i 
            onClick={() => increaseQty(item)}
            className='fa fa-plus border cursor-pointer width-qty height-qty justify-content-center align-items-center d-flex'
          ></i>
        </div>
        <div className='col-2 px-md-3 px-1 d-flex justify-content-center align-items-center'>
          <Price isSmall={true} times={item.count} multiLine={true} price={item.price} sales={item.sales} />
        </div>
        <div className='col-1 px-md-3 px-1 d-flex justify-content-center align-items-center'>
          <span className='heading-small text-link' onClick={() => deleteProductInCart(item)}>Xoá</span>
        </div>
      </div>
    )
  }
  const renderProducts = () => {
    return (
      <div>
        {props.cart.products.map((item, index) => {
          return renderItem(item, index)
        })}
      </div>
    )
  }
  const renderToTal = () => {
    let subTotal = 0;
    let discount = 0;
    props.cart.products.map((item) => {
      discount += parseInt(item.count) * parseInt(item.price) * parseInt(item.sales);
      subTotal += parseInt(item.count) * parseInt(item.price);
    })
    const total = subTotal - discount;
    return (
      <div className='mt-md-3 mt-2 d-flex justify-content-end'>
        <div className='w-md-25 w-50'>
          <div className='d-flex justify-content-between gap-2'>
            <span className='heading-small'>Tổng tiền hàng</span>
            <span>{subTotal}<sup>{currency}</sup></span>
          </div>
          <div className='d-flex justify-content-between gap-2'>
            <span className='heading-small'>Giảm giá</span>
            <span>-{discount}<sup>{currency}</sup></span>
          </div>
          <div className='d-flex justify-content-between gap-2'>
            <span className='heading-small'>Thanh toán</span>
            <Price price={total}/>
          </div>
          <div className='d-flex justify-content-end mt-md-3 mt-2'>
            <Button onClick={() => props.history.push('/payment')}>
              <span className='heading'>Mua hàng</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  const renderContent = () => {
    if (props.cart?.products?.length > 0) {
      return (
        <div>
          {renderHeader()}
          {renderProducts()}
          {renderToTal()}
        </div>
      )
    }
    else {
      return (
        <div className='d-flex justify-content-center w-100'>
          <span className='heading'>Không có sản phẩm nào trong giỏ hàng</span>
        </div>
      )
    }
  }
  return (
    <div className='container py-md-4 py-3'>
      {renderContent()}
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cartReducers.cart.data
})

const mapDispatchToProps = dispatch => {
  return ({
    cartActions: bindActionCreators(cartActions, dispatch)
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)