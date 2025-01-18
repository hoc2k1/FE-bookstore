import React, { Component } from "react";
import BannerGrid from "./banner.grid.home";
import BannerSlide from "./banner.slide.home";
import Categories from "./categories.home";
class ContentHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section>
        <div className="container">
          <BannerSlide banners={this.props.banner} />
          <BannerGrid banners={this.props.banner} />
          <Categories categories={this.props.category} history={this.props.history}/>
        </div>
      </section>
    );
  }
}
export default ContentHome;
