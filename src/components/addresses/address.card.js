import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/user.action'

const AddressCard = (props) => {
  const renderRow = (title, value) => {
    if(value) {
      return (
        <div>
          <span><span className="heading-small">{title}: </span><span>{value}</span></span>
        </div>
      )
    }
    else {
      return null
    }
  }
  const handleEdit = () => {
    props.history.push({
      pathname: '/address', 
      search: `?id=${props.address._id}`
    })
  }
  const handleDelete = () => {
    props.actions.deleteAddress(props.address._id)
  }
  return (
    <div className="p-md-3 p-2 shadow d-flex">
      <div className="flex-grow-1">
        {renderRow('Họ tên', props.address.firstName + ' ' + props.address.lastName)}
        {renderRow('Tỉnh/Thành phố', props.address.province)}
        {renderRow('Quận/Huyện', props.address.district)}
        {renderRow('Phường/Xã', props.address.commune)}
        {renderRow('Địa chỉ cụ thể', props.address.specificAddress)}
        {renderRow('Số điện thoại', props.address.phoneNumber)}
      </div>
      <div className="d-flex flex-column gap-md-3 gap-2">
        <i onClick={() => handleDelete()} className="fa fa-times-circle icon-address p-md-2 p-1 cursor-pointer"></i>
        <i onClick={() => handleEdit()} className="fa fa-pencil-square-o icon-address p-md-2 p-1 cursor-pointer"></i>
      </div>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators(userActions, dispatch),
  })
}

export default connect(null, mapDispatchToProps)(AddressCard)