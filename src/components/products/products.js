import React, { Component } from "react";
import ProductItem from "../product/product.item";
import { Link } from "react-router-dom";
import Filter from "./filter.products";
import ProductGrid from "./product.grid";
class ContentProducts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container d-flex flex-column flex-grow-1">
        <Filter disableFilter={this.props.disableFilter}/>
        <ProductGrid />
      </div>
    );
  }
}
export default ContentProducts;
