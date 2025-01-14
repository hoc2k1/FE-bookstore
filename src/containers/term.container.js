import React, { Component } from "react";
import Term from "../components/contact/term";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
class TermContainer extends Component {
  render() {
    return (
      <div className="d-flex flex-column min-h-full">
        <Header history={this.props.history}/>
        <div className="d-flex flex-column flex-grow-1">
          <Term history={this.props.history}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TermContainer;
