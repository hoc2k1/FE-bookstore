import React from 'react'

const AddressAddButton = (props) => {
  return (
    <div 
      className="d-flex cursor-pointer align-items-center justify-content-center gap-md-3 gap-2 p-3 w-100 border-dash border-2" 
      onClick={() => props.history.push('/address')}
    >
      <i className="fa fa-plus-circle icon-normal"></i>
      <span className="heading">Thêm địa chỉ</span>
    </div>
  )
}

export default AddressAddButton