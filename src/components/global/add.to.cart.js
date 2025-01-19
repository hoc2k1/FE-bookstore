import React, {useState} from 'react' 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../actions/cart.action'
import Loading from '../loading/loading'
import { currency } from '../../constants/values'

const AddToCart = ({product, cartActions, addToCardLoading}) => {
  const [qty, setQty] = useState(1)
  const [isPackage, setIsPackage] = useState(false)
  const addToCart = () => {
    const item = product
    item.count = qty
    item.is_package = isPackage;
    cartActions.addToCart({products: [item]})
  }
  if (parseInt(product.count) > 0 || product.available) {
    return (
      <div className={`w-100 d-flex mt-2 flex-column`}>
        <div className="d-flex align-items-center">
          <span className="text-nowrap">Số lượng:&nbsp;</span>
          <input
            type="number"
            id=""
            name=""
            value={qty}
            className={`header-search-input px-3 py-2 border`}
            onChange={e => setQty(e.target.value)}
          />
        </div>
        <div
          onClick={() =>  setIsPackage(!isPackage)}
          className={`d-flex p-2 align-items-center cursor-pointer`}
        >
          <i className={`icon-checkbox ${isPackage ? 'fa fa-check-square' : 'border'}`}></i>
          <span className="text-nowrap text-capitalize">Đóng gói sản phẩm (3.000<sup>{currency}</sup> / 1 sản phẩm)</span>
        </div>

        <div onClick={() => addToCart()} style={{ marginTop: '0.5rem' }} className='position-relative'>
          <span className={`add-to-card-button heading`}>Thêm vào giỏ hàng</span>
          <div className={`absolute-full secondary-bg ${addToCardLoading ? 'd-flex' : 'd-none'}`}>
            <Loading isSmall={true}/>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="out-of-stock-button heading">
        Hết hàng
      </div>
    )
  }
}

const mapStateToProps = state => ({
  addToCardLoading: state.cartReducers.cart.addToCardLoading
})
const mapDispatchToProps = dispatch => {
  return ({
    cartActions: bindActionCreators(cartActions, dispatch)
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(AddToCart)