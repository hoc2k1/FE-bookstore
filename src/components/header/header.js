import React, { Component } from "react";
import { Link } from "react-router-dom";
import storeConfig from "../../config/storage.config";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/user.action'
import { keyFilter } from "../../constants/values"; 

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "Account",
      searchText: ''
    };
    this.menu = [
      {
        name: 'Trang chủ',
        path: '/'
      },
      {
        name: 'Sản phẩm',
        path: '/products'
      },
      {
        name: 'Danh mục',
        path: '/category'
      },
      {
        name: 'Liên hệ',
        path: '/contact'
      }
    ]
  }
  componentWillMount() {
    if (storeConfig.getUser() !== null) {
      this.setState({
        email: storeConfig.getUser().email
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.islogin) {
      this.setState({
        email: "Account"
      });
    } else {
      this.setState({
        email: storeConfig.getUser().email
      });
    }
  }
  handlelogin = () => {
    if (this.props.islogin) {
      return (
        <li
          className="btn-custom"
          onClick={() => {
            window.location.reload();
            this.props.actions.logout();
          }}
        >
          <a>
            <i className="fa fa-user icon-header" aria-hidden="true"></i>
          </a>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/login_register">
            <i className="fa fa-user icon-header" aria-hidden="true"></i>
          </Link>
        </li>
      );
    }
  };
  handleProfile = () => {
    if (this.state.email === "Account") {
      return;
    } else {
      this.props.history.push("/profile/" + this.state.email);
    }
  };
  render() {
    return (
      <header id="header" className="sticky-top header ">
        <div className="container py-2">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <div className="logo">
              <a href="/">
                <img src="/assets/images/home/logo.png" alt="" />
              </a>
            </div>
            <div className="flex-grow-1">
              <ul className="d-flex flex-row list-unstyled gap-3 justify-content-end align-items-center mb-0">
                <ul className="d-flex flex-row list-unstyled justify-content-center align-items-center mb-0 w-100">
                  <div className="d-none d-md-flex gap-4">
                    {
                      this.menu.map((item, index) => {
                        let is_active = false
                        if (this.props.history && this.props.history.location.pathname === item.path) {
                          is_active = true
                        }
                        return (
                          <li key={index}>
                            <Link to={item.path} className={`heading text-link ${is_active ? 'active' : ''} `}>
                              {item.name}
                            </Link>
                          </li>
                        )
                      }) 
                    }
                  </div>
                  <div className="d-none d-md-flex flex-grow-1 mx-5 border-bottom d-flex justify-content-between align-items-center">
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
                <li>
                  <Link to={"/cart"}>
                    <i className="fa fa-shopping-cart icon-header" />
                  </Link>
                </li>
                {this.handlelogin()}
              </ul>
            </div>
          </div>
          <div className="d-flex d-md-none flex-grow-1 mx-3 border-bottom d-flex justify-content-between align-items-center">
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
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  islogin: state.userReducers.login.islogin,
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
