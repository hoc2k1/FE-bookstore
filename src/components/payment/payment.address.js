import React, {useState} from 'react'
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux'
import * as billActions from '../../actions/bill.action'
import { cartGridType } from '../../constants/values'
import AddressAddButton from '../addresses/address.add.button'
import Addresscard from '../addresses/address.card'
import Modal from 'react-modal';
import { checkNotEmpty } from '../../config/identify'

const PaymentAddress = (props) => {
  const [showPopup, setShowPopup] = useState(false) 
  const renderHeader = () => {
    if (props.type == cartGridType.payment) {
      return (
        <div>
          <div className="d-flex">
            <div 
              className="d-flex cursor-pointer border-dash p-2 my-2 my-md-3" 
              onClick={() => setShowPopup(true)}
            >
              <span className="heading-small text-link">Chọn địa điểm</span>
            </div>
          </div>
        </div>
      )
    }
    else {
      return null
    }
  }
  const renderContent = () => {
    if (props.bill.address) {
      return (
        <div className='border p-md-3 p-2'>
          <div>
            <span><span className='heading-small'>Tên người nhận: </span><span>{props.bill.name}</span></span>
          </div>
          <div>
            <span><span className='heading-small'>Số điện thoại: </span><span>{props.bill.phone}</span></span>
          </div>
          <div>
            <span><span className='heading-small'>Địa chỉ nhận hàng: </span><span>{props.bill.address}</span></span>
          </div>
        </div>
      )
    }
    else {
      return null
    }
  }
  const renderAddresses = () => {
    if (checkNotEmpty(props.address)) {
      return <AddressAddButton type={cartGridType.payment} history={props.history} />
    }
    else {
      return (
        <div className="w-100 py-md-3 py-2 d-flex justify-content-center flex-column">
          {props.addresses.map((item, index) => {
            const chooseAddress = () => {
              let address = ''
              if (item.specificAddress) {
                address += item.specificAddress
              }
              if (item.commune) {
                if (address) {
                  address += ', ' + item.commune
                }
                else {
                  address += item.commune
                }
              }
              if (address) {
                address += ', ' + item.district + ', ' + item.province
              }
              else {
                address += item.district + ', ' + item.province
              }
              const data = {
                id: props.bill._id,
                address: address,
                phone: item.phoneNumber,
                name: item.firstName + ' ' + item.lastName,
              }
              props.billActions.updateBill(data)
              setShowPopup(false)
            }
            return (
              <div className={`${index != 0 ? 'mt-md-3 mt-2' : ''} w-100`} key={`address-card-${index}`}>
                <Addresscard chooseAddress={() => chooseAddress()} history={props.history} type={cartGridType.payment} address={item}/>
              </div>
            )
          })}
        </div>
      )
    }
  }
  return (
    <div>
      {renderHeader()}
      {renderContent()}
      <Modal 
        isOpen={showPopup}
        onRequestClose={() => setShowPopup(false)}
        shouldCloseOnOverlayClick={true}
      >
        <i className='fa fa-times-circle cursor-pointer font-size-normal text-end p-2 p-md-3 position-fixed top-0 right-0' onClick={() => setShowPopup(false)}></i>
        <div className='container h-100'>
          {renderAddresses()}
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  addresses: state.userReducers.user.addresses
})

const mapDispatchToProps = dispatch => {
  return ({
    billActions: bindActionCreators(billActions, dispatch),
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(PaymentAddress)

