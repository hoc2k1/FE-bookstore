import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeContainer from './home.container'
import LoginRegisterContainer from './login.register.container'
import ForgotPasswordContainer from './forgot.password.container'
import ProductDetailContainer from './product.detail.container'
import ProfileContainer from './profile.container'
import CartContainer from './cart.container'
import PaymentContainer from './payment.container'
import ProductsContainer from './products.container'
import { Toaster } from 'react-hot-toast';
import AddressesContainer from './addresses.container'
import AddressContainer from './address.container'
import ThankYouContainer from './thank.you.container'
import BillContainer from './bill.container'
import BillsContainer from './bills.container'
import ContactContainer from './contact.container'
import TermContainer from './term.container'
import 'rsuite/dist/rsuite.min.css';
const App = () => (
  <div className="w-100 h-100">
    <Toaster position="top-center" toastOptions={{duration: 5000}}/>
    <Router>
      <Switch>
        <Route exact path='/' component={HomeContainer} />
        <Route exact path='/login_register' component={LoginRegisterContainer} />
        <Route exact path='/forgotpass' component={ForgotPasswordContainer} />
        <Route exact path='/product/:id' component={ProductDetailContainer} />
        <Route exact path='/profile' component={ProfileContainer} />
        <Route exact path='/addresses' component={AddressesContainer} />
        <Route exact path='/address' component={AddressContainer} />
        <Route exact path='/cart' component={CartContainer} />
        <Route exact path='/payment' component={PaymentContainer} />
        <Route exact path='/products' component={ProductsContainer} />
        <Route exact path='/thankyou' component={ThankYouContainer} />
        <Route exact path='/bills' component={BillsContainer} />
        <Route exact path='/bill' component={BillContainer} />
        <Route exact path='/contact' component={ContactContainer} />
        <Route exact path='/term' component={TermContainer} />
      </Switch>
    </Router>
  </div>
)

export default App;
