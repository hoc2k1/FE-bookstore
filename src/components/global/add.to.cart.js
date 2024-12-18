import React, {useState} from 'react' 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../actions/cart.action'
import Loading from '../loading/loading'

const AddToCart = ({product, cartActions, addToCardLoading}) => {
  const [qty, setQty] = useState(1)
  const addToCart = () => {
    const item = product
    item.count = qty
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