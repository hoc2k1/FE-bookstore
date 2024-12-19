import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/user.action'
import { keyFilter, listUserPage, listPageInHeader } from "../../constants/values"; 
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showPopup: false,
      showDrawer: false
    };
  }
  renderUser = () => {
    if (this.props.islogin) {
      return (
        <li className="position-relative d-lg-flex d-none">
          <div className="flex-column d-flex icon-header-container align-items-center text-decoration-none cursor-pointer" onClick={() => this.setState({showPopup: !this.state.showPopup}) }>
            <i className="fa fa-user icon-header" />
            <span className="text-link text-nowrap text-truncate">{this.props.user && this.props.user.firstName + ' ' + this.props.user.lastName}</span>
          </div>
          <div className={`popup-header position-absolute color-bg d-flex flex-column border ${this.state.showPopup ? 'd-flex' : 'd-none'}`}>
            {listUserPage.map((item, index) => {
              return (
                <div 
                  key={index}
                  onClick={async () => {
                    if(item.key == 'signOut') {
                      await this.props.actions.logout();
                    }
                    this.props.history.push(item.url)
                  }} 
                  className={`cursor-pointer gap-2 d-flex align-items-center p-2 ${!(index == listUserPage.length - 1) ? 'border-bottom' : ''}`}
                >
                  <i className={`fa fa-${item.icon} icon-header-in-popup`}></i>
                  <span className="text-link text-nowrap">{item.title}</span>
                </div>
              )
            })}
          </div>
        </li>
      );
    } else {
      return (
        <li className="d-lg-flex d-none">
          <Link to={"/login_register"} className="flex-column d-flex icon-header-container align-items-center text-decoration-none">
            <i className="fa fa-user icon-header" />
            <span className="text-link text-nowrap">Đăng nhập</span>
          </Link>
        </li>
      );
    }
  };
  renderCartInDrawer = () => {
    return (
      <div>
        <div 
          className="p-2 border-bottom w-100 gap-2 d-flex"
          key={`mb-heading-cart-drawer`} 
        >
          <span className="heading">Giỏ hàng</span>
        </div>
        <div 
          className="p-2 border-bottom w-100 gap-2 d-flex align-items-center"
          key={`mb-cart-drawer`} 
          onClick={() => this.props.history.push('/cart')}
        >
          <i className={`fa fa-shopping-cart icon-header-in-popup position-relative`}>
            <div className={`cart-dot ${this.props.cart?.products?.length > 0 ? 'd-flex' : 'd-none'}`}>
              <span>{this.props.cart?.products?.length > 99 ? '99+' : this.props.cart?.products?.length}</span>
            </div>
          </i>
          <span className="text-link">Giỏ hàng</span>
        </div>
      </div>
    )
  }
  renderUserInDrawer = () => {
    if(this.props.islogin) {
      return (
        <div>
          <div 
            className="p-2 border-bottom w-100 gap-2 d-flex"
            key={`mb-heading-user-drawer`} 
          >
            <span className="heading">Tài khoản</span>
          </div>
          {listUserPage.map((item, index) => {
            return (
              <div 
                className="p-2 border-bottom w-100 gap-2 d-flex align-items-center"
                key={`mb-${item.key}-${index}`} 
                onClick={async () => {
                  if(item.key == 'signOut') {
                    await this.props.actions.logout();
                  }
                  this.props.history.push(item.url)
                  this.setState({showDrawer: !this.state.showDrawer})
                }}
              >
                <i className={`fa fa-${item.icon} icon-header-in-popup`}></i>
                <span className="text-link">{item.title}</span>
              </div>
            )
          })}
        </div>
      )
    }
    else {
      return (
        <div>
          <div 
            className="p-2 border-bottom w-100 gap-2 d-flex"
            key={`mb-heading-user-drawer`} 
          >
            <span className="heading">Tài khoản</span>
          </div>
          <div 
            className="p-2 border-bottom w-100 gap-2 d-flex align-items-center"
            key={`mb-user-drawer`} 
            onClick={() => this.props.history.push('/login_register')}
          >
            <i className={`fa fa-user icon-header-in-popup`}></i>
            <span className="text-link">Đăng nhập</span>
          </div>
        </div>
        
      )
    }
  }
  renderDrawerContent = () => {
    return (
      <div className="p-4 h-100 w-100">
        <div className="h-100 overflow-auto">
          {listPageInHeader.map((item, index) => {
            let is_active = false
            if (this.props.history && this.props.history.location.pathname === item.url) {
              is_active = true
            }
            return (
              <div 
                className={`text-link p-2 border-bottom w-100 ${is_active ? 'text-decoration-none' : ''}`}
                key={`mb-${item.key}-${index}`} 
                onClick={() => this.props.history.push(item.url)}>
                {item.title}
              </div>
            )
          })}
          {this.renderCartInDrawer()}
          {this.renderUserInDrawer()} 
        </div>
      </div>
    )
  }
  render() {
    return (
      <header id="header" className="sticky-top header ">
        <div className="container py-2">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <div className="d-flex gap-2 gap-md-3 align-items-center">
              <div className="cursor-pointer" onClick={() => this.setState({showDrawer: !this.state.showDrawer})}>
                <i className="fa fa-bars d-flex d-lg-none icon-header icon-bars"></i>
              </div>
              <Drawer
                open={this.state.showDrawer}
                onClose={() => this.setState({showDrawer: false})}
                direction='left'
                className=''
              >
                {this.renderDrawerContent()}
              </Drawer>
              <a href="/" className="logo">
                <img src="/assets/images/home/logo.png" alt="" />
              </a>
            </div>
            <div className="flex-grow-1">
              <ul className="d-flex flex-row list-unstyled gap-3 justify-content-end align-items-center mb-0">
                <ul className="d-flex flex-row list-unstyled justify-content-center align-items-center mb-0 w-100">
                  <div className="d-none d-lg-flex gap-4">
                    {
                      listPageInHeader.map((item, index) => {
                        let is_active = false
                        if (this.props.history && this.props.history.location.pathname === item.url) {
                          is_active = true
                        }
                        return (
                          <li key={`${item.key}-${index}`}>
                            <Link to={item.url} className={`heading text-link ${is_active ? 'active' : ''} `}>
                              {item.title}
                            </Link>
                          </li>
                        )
                      }) 
                    }
                  </div>
                  <div className="flex-grow-1 mx-md-5 mx-0 border-bottom d-flex justify-content-between align-items-center">
                    <input
                      type="" 
                      id=""
                      name=""
                      placeholder="Tìm kiếm"
                      className="w-100 header-search-input px-3 py-2 border-0"
                      onChange={e => this.setState({searchText: e.target.value})}
                    />
                    <a href={`/products?${keyFilter.SEARCH_TEXT}=${this.state.searchText}`}>
                      <i className="fa fa-search icon-header-search px-3 border-start" aria-hidden="true"></i>
                    </a>
                  </div>
                </ul>
                <li className="d-lg-flex d-none">
                  <Link to={"/cart"} className="flex-column d-flex icon-header-container align-items-center text-decoration-none">
                    <i className="fa fa-shopping-cart icon-header position-relative">
                      <div className={`cart-dot ${this.props.cart?.products?.length > 0 ? 'd-flex' : 'd-none'}`}>
                        <span>{this.props.cart?.products?.length > 99 ? '99+' : this.props.cart?.products?.length}</span>
                      </div>
                    </i>
                    <span className="text-link text-nowrap">Giỏ hàng</span>
                  </Link>
                </li>
                {this.renderUser()}
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  islogin: state.userReducers.login.islogin,
  user: state.userReducers.user.user,
  cart: state.cartReducers.cart.data
})

const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators(userActions, dispatch),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
