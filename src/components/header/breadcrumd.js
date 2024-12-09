import React from "react";
import { Link } from "react-router-dom";
import storeConfig from "../../config/storage.config";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/user.action'

const Breadcrumb = ({ history }) => {
  if (history) {
    let screenName;
    switch (history.location.pathname.split('/')[1]) {
      case 'products':
        screenName = 'Danh sách sản phẩm';
        break;
      case 'products':
        screenName = 'Thông tin sản phẩm';
        break;
      default:
        screenName = 'Trang chủ';
    }
    return (
      <div className="breadcrumb">
        <div className="container py-4 justify-content-center d-flex">
          <span>
            <Link to={'/'} className="text-link">
              Trang chủ
            </Link>
            <span>__</span>
            <span className="color-theme">{screenName}</span>
          </span>
        </div>
      </div>
    )
  } else {
    return null
  }
  
}

export default Breadcrumb