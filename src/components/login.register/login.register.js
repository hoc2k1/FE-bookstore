import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import ContentLoginRegister from './content.login.register'
const Home = ({ setEmailogin, setPasswordlogin, setEmail,
  setFirstname, setLastname, setAddress, setPhone, setPassword, setConfirm,
  notificationRegister, notificationLogin, registerSubmit,
  loginSubmit, islogin, logout, sortType, setSortType, setSearchText,
  history }) => (
  <div>

    <Header
      islogin={islogin}
      logout={() => logout}
      history={history}
    />

    <ContentLoginRegister
      setEmailogin={(value) => setEmailogin(value)}
      setPasswordlogin={(value) => setPasswordlogin(value)}
      setEmail={(value) => setEmail(value)}
      setFirstname={(value) => setFirstname(value)}
      setLastname={(value) => setLastname(value)}
      setAddress={(value) => setAddress(value)}
      setPhone={(value) => setPhone(value)}
      setPassword={(value) => setPassword(value)}
      setConfirm={(value) => setConfirm(value)}
      notificationRegister={notificationRegister}
      notificationLogin={notificationLogin}
      registerSubmit={() => registerSubmit()}
      loginSubmit={() => loginSubmit()}
    />
    <Footer />
  </div>

)

export default Home