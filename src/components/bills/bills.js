import React from "react";
import { connect } from "react-redux";
import { billStatus, currency } from "../../constants/values";

const Bills = (props) => {
  const renderRow = (title, value, textStyle) => {
    if(title == "Tổng tiền") {
      return (
        <div>
          <span><span className="heading-small">{title}: </span><span>{value}<sup>{currency}</sup></span></span>
        </div>
      )
    }
    else if (title == "Trạng thái đơn hàng") {
      return (
        <div>
          <span><span className="heading-small">{title}: </span><span className={`${textStyle}`}>{value}</span></span>
        </div>
      )
    }
    else {
      return (
        <div>
          <span><span className="heading-small">{title}: </span><span>{value}</span></span>
        </div>
      )
    }
  }
  const renderBillItem = (item, index) => {
    let textStyle = ''
    switch (item.status) {
      case billStatus.wait_accept: 
        textStyle = 'status-wait'
        break;
      case billStatus.shipping: 
        textStyle = 'status-shipping'
        break;
      case billStatus.complete: 
        textStyle = 'status-complete'
        break;
      case billStatus.cancel: 
        textStyle = 'status-cancel'
        break;
    }
    return (
      <div className={`${index != 0 ? 'mt-md-3 mt-2' : ''} w-100`}>
        <div className={`p-md-3 p-2 shadow d-flex cursor-pointer`} onClick={() => props.history.push({pathname: 'bill', search: `?id=${item._id}`})}>
          <div className="flex-grow-1">
            {renderRow('ID', '#' + item._id)}
            {renderRow('Họ tên người nhận', item.name)}
            {renderRow('Địa chỉ nhận hàng', item.address)}
            {renderRow('Số điện thoại', item.phone)}
            {renderRow('Trạng thái đơn hàng', item.status, textStyle)}
            {renderRow('Ngày đặt hàng', item.date_create)}
            {renderRow('Tổng tiền', item.total)}
          </div>
        </div>
      </div>
    )
  }
  if (!props.bills?.length > 0) {
    return (
      <div className='container'>
        <div className="d-flex p-0 width-small mx-auto header-login-register active align-items-center justify-content-center">
          <span className={`heading p-3 p-md-4 text-center`}>Danh sách đơn hàng</span>
        </div>
        <div className="my-3 my-md-4">
          {props.bills.map((item, index) => {
            return (
              <div key={index}>
                {renderBillItem(item, index)}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='container'>
        <div className='d-flex justify-content-center w-100 mt-3 mt-md-4'>
          <span className='heading'>Không có đơn hàng nào</span>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  bills: state.billReducers.bill.bills
})
export default connect(mapStateToProps, null)(Bills)