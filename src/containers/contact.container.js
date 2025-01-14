import React, { Component } from "react";
import Contact from "../components/contact/contact";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
class ContactContainer extends Component {
  render() {
    return (
      <div className="d-flex flex-column min-h-full">
        <Header history={this.props.history}/>
        <div className="d-flex flex-column flex-grow-1">
          <Contact history={this.props.history}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactContainer;
