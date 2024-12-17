import React from 'react'
import Addresscard from './address.card'
import { connect } from 'react-redux'
import { checkNotEmpty } from '../../config/identify'
import AddressAddButton from './address.add.button'
import Loading from '../loading/loading'

const Addresses = (props) => {
  const renderAddNewButton = () => {
    return (
      <div className="w-100 mt-md-3 mt-2 d-flex justify-content-center">
        <AddressAddButton history={props.history}/>
      </div>
    )
  }
  const renderListAddress = () => {
    if (props.addressesLoading) {
      return <Loading />
    }
    else {
      if (checkNotEmpty(props.addresses)) {
        return (
          <div className="w-100 mt-md-3 mt-2 d-flex justify-content-center flex-column">
            {props.addresses.map((item, index) => {
              return (
                <div className="mt-md-3 mt-2 w-100" key={`address-card-${index}`}>
                  <Addresscard history={props.history} address={item}/>
                </div>
              )
            })}
          </div>
        )
      }
      else {
        return (
          <div className="w-100 mt-md-3 mt-2 d-flex justify-content-center">
            <span className="heading text-center">Không có địa chỉ nào</span>
          </div>
        )
      }
    }
  }
  return (
    <div className="container">
      <div className="width-small mx-auto d-flex flex-column mb-3">
        {renderAddNewButton()}
        <div className="w-100 flex-grow-1">
          {renderListAddress()}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  addresses: state.userReducers.user.addresses,
  addressesLoading: state.userReducers.user.addressesLoading
})

export default connect(mapStateToProps, null)(Addresses)