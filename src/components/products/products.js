import React, { Component } from "react";
import Filter from "./filter.products";
import ProductGrid from "./product.grid";
import { connect } from "react-redux";
import { keyFilter } from "../../constants/values";

class ContentProducts extends Component {
  constructor(props) {
    super(props);
    if (this.props.urlParam && this.props.urlParam.key && this.props.urlParam.value) {
      switch (this.props.urlParam.key ) {
        case keyFilter.SEARCH_TEXT:
          this.heading = {
            label: 'Tìm kiếm',
            value: this.props.urlParam.value
          }
          break;
        case keyFilter.SEARCH_PUBLISHER:
          this.heading = {
            label: 'Nhà sản xuất',
            value: this.props.publisher.filter(item => item._id === this.props.urlParam.value)[0].name
          }
          break;
        case keyFilter.SEARCH_AUTHOR:
          this.heading = {
            label: 'Tác giả',
            value: this.props.author.filter(item => item._id === this.props.urlParam.value)[0].name
          }
          break;
        case keyFilter.SEARCH_CATEGORY:
          this.heading = {
            label: 'Thể loại',
            value: this.props.category.filter(item => item._id === this.props.urlParam.value)[0].name
          }
          break;
        default:
          return null;
      }
    }
  }
  render() {
    return (
      <div className="container d-flex flex-column flex-grow-1">
        {this.heading && (<p className="heading">{this.heading.label}: "{this.heading.value}"</p>)}
        <Filter disableFilter={this.props.disableFilter} history={this.props.history}/>
        <ProductGrid history={this.props.history}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.homeReducers.category.data,
  publisher: state.homeReducers.publisher.data,
  author: state.homeReducers.author.data,
})

export default connect(mapStateToProps, null)(ContentProducts);
