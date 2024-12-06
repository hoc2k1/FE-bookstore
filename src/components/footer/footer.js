import React, {memo, useState} from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [menu, setMenu] = useState([
    {
      title: "",
      key: 'contact',
      childrens: [
        {
          name: "Địa chỉ: Đại học Bách Khoa Hà Nội"
        },
        {
          name: "Số điện thoại: 0888 888 888"
        },
        {
          name: "Email: hoc.kt194287@sis.hust.edu.vn"
        }
    ]
    },
    {
      title: "Cửa hàng",
      key: 'info',
      childrens: [
        {
          name: "Liên hệ",
          link: "/contact"
        },
        {
          name: "Điều khoản",
          link: "/term"
        }
      ]
    },
    {
      title: "Phương thức thanh toán",
      key: 'payment',
      childrens: [
        {
          name: "Liên hệ",
          link: "/contact"
        },
        {
          name: "Điều khoản ",
          link: "/contact"
        }
      ]
    } 
  ])
  return (
    <footer className="footer">
      <div className="container g-3 py-2 py-md-5 row">
        {menu.map((item, index) => {
          switch(item.key) {
            case 'contact':
              return (
                <div key={index} className='col-md-4'>
                  <div className="logo">
                    <a href="/">
                      <img src="/assets/images/home/logo.png" alt="" />
                    </a>
                  </div>
                  {item.childrens.map((children, index1) => (
                    <p key={index1}>{children.name}</p>
                  ))}
                </div>
              )
            case 'payment':
              return (
                <div key={index} className='col-md-4'>
                  <p className='heading-small'>{item.title}</p>
                </div>
              )
            default: 
              return (
                <div key={index} className='col-md-4'>
                  <p className='heading-small'>{item.title}</p>
                  {item.childrens.map((children, index1) => (
                    <Link to={children.link} className='text-link d-flex mb-3'>
                      {children.name}
                      <br/>
                    </Link>
                  ))}
                </div>
              )
          }
        })}
      </div>
    </footer>
  )
}

export default memo(Footer)