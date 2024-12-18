import React, {useState} from 'react' 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/user.action'
import * as homeActions from '../../actions/home.action'
import * as productActions from '../../actions/product.action'

const AddToCart = ({product}) => {
  const [qty, setQty] = useState(1)
  const addToCart = () => {

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
        <div onClick={() => addToCart()} style={{ marginTop: '0.5rem' }}>
          <span className="add-to-card-button heading">Thêm vào giỏ hàng</span>
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
  islogin: state.userReducers.login.islogin,
})
const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators(userActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(AddToCart)