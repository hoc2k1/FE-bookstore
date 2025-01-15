import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from '../../actions/cart.action'
import * as billActions from '../../actions/bill.action'
import ProductCard from '../products/product.card'
import Price from '../product.detail/product.price'
import { currency, cartGridType, packPrice } from '../../constants/values'
import Button from '../button/button'
import toast from "react-hot-toast";

const CartGrid = (props) => {
  const products = props.products ? props.products : props.cart?.products
  const renderHeader = () => {
    return (
      <div className='row secondary-bg'>
        <div className='col-6 px-md-3 px-1 d-flex justify-content-center align-items-center py-md-3 py-2'>
          <span className='heading-small color-theme'>Sản phẩm</span>
        </div>
        <div className='col-3 px-md-3 px-1 d-flex justify-content-center align-items-center py-md-3 py-2'>
          <span className='heading-small color-theme'>Số lượng</span>
        </div>
        <div className={`${props.type == cartGridType.cart ? 'col-2' : 'col-3'} col-2 px-md-3 px-1 d-flex justify-content-center align-items-center py-md-3 py-2`}>
          <span className='heading-small color-theme'>Số tiền</span>
        </div>
        <div className={`${props.type == cartGridType.cart ? 'd-flex' : 'd-none'} col-1 px-md-3 px-1 d-flex justify-content-center align-items-center py-md-3 py-2`}>
          <span className='heading-small color-theme'></span>
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
            className={`${props.type == cartGridType.cart ? 'd-flex' : 'd-none'} fa fa-minus border width-qty height-qty justify-content-center align-items-center ${item.count == 1 ? 'input-disabled cursor-not-allow' : 'cursor-pointer'}`}
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
            className={`${props.type == cartGridType.cart ? 'd-flex' : 'd-none'} fa fa-plus border cursor-pointer width-qty height-qty justify-content-center align-items-center`}
          ></i>
        </div>
        <div className={`${props.type == cartGridType.cart ? 'col-2' : 'col-3'} px-md-3 px-1 d-flex justify-content-center align-items-center`}>
          <Price isSmall={true} times={item.count} multiLine={true} price={item.price} sales={item.sales} isPackage={item.is_package}/>
        </div>
        <div className={`${props.type == cartGridType.cart ? 'd-flex' : 'd-none'} col-1 px-md-3 px-1 d-flex justify-content-center align-items-center`}>
          <span className='heading-small text-link' onClick={() => deleteProductInCart(item)}>Xoá</span>
        </div>
      </div>
    )
  }
  const renderProducts = () => {
    return (
      <div>
        {products.map((item, index) => {
          return renderItem(item, index)
        })}
      </div>
    )
  }
  const onSubmit = async (data) => {
    if (props.type == cartGridType.cart) {
      if (props.islogin) {
        const check = props.billActions.findOrAdd(data)
        if (check) {
          props.history.push('/payment')
        }
      }
      else {
        toast.error('Hãy đăng nhập hoặc đăng ký trước khi thanh toán!')
        props.history.push({
          pathname: '/login_register',
          search: '?from=cart'
        })
      }
    }
    else if (props.type == cartGridType.payment) {
      const id_bill = props.id_bill
      const check = await props.billActions.checkout(id_bill)
      if (check) {
        props.history.push({
          pathname: '/thankyou', 
          search: `?id_bill=${id_bill}`
        })
      }
    }
    else {
      props.cartActions.addToCart({products: products})
    }
  }
  const renderToTal = () => {
    let subtotal = 0;
    let discount = 0;
    let packTotal = 0;
    products.map((item) => {
      discount += parseInt(item.count) * parseInt(item.price) * parseInt(item.sales) / 100;
      subtotal += parseInt(item.count) * parseInt(item.price);
      if (item.is_package) {
        packTotal += parseInt(item.count) * packPrice;
      }
    })
    const total = subtotal + packTotal - discount;
    let title = ''
    if (props.type == cartGridType.cart) {
      title = 'Mua hàng'
    }
    else if (props.type == cartGridType.payment) {
      title = 'Thanh toán'
    }
    else {
      title = "Đặt mua lại"
    }
    return (
      <div className='mt-md-3 mt-2 d-flex justify-content-end'>
        <div className='w-md-25 w-50'>
          <div className='d-flex justify-content-between gap-2'>
            <span className='heading-small'>Tổng tiền hàng</span>
            <span>{subtotal}<sup>{currency}</sup></span>
          </div>
          <div className='d-flex justify-content-between gap-2'>
            <span className='heading-small'>Tổng tiền gói hàng</span>
            <span>{packTotal}<sup>{currency}</sup></span>
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
            <Button onClick={() => onSubmit({total: total, subtotal: subtotal, packTotal: packTotal, discount: discount, products: products})}>
              <span className='heading'>{title}</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  if (products?.length > 0) {
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

const mapStateToProps = state => ({
  cart: state.cartReducers.cart.data,
  islogin: state.userReducers.login.islogin
})

const mapDispatchToProps = dispatch => {
  return ({
    cartActions: bindActionCreators(cartActions, dispatch),
    billActions: bindActionCreators(billActions, dispatch)
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(CartGrid) 