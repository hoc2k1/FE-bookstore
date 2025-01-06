import React, { Component } from "react";
import Banner from "./banner.home";
import Categories from "./categories.home";
class ContentHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section>
        <div className="container">
          <Banner banners={this.props.banner} />
          <Categories categories={this.props.category} history={this.props.history}/>
        </div>
      </section>
    );
  }
}
export default ContentHome;
