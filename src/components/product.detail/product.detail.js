import React, { Component } from "react";
import Header from "../header/header"
import Footer from '../footer/footer'
import ContentProductDetail from "./cotent.product.detail";
class ProductDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header
          islogin={this.props.islogin}
          logout={() => this.props.logout()}
          history={this.props.history}
        />
        <ContentProductDetail
          category={this.props.category}
          publisher={this.props.publisher}
          productDetail={this.props.productDetail}
          nameCategory={this.props.nameCategory}
          namePublicsher={this.props.namePublicsher}
          bookrelated={this.props.bookrelated}
          islogin={this.props.islogin}
          id_book={this.props.id_book}
          submitComment={(name, email, comment, id_book) =>
            this.props.submitComment(name, email, comment, id_book)
          }
          comment={this.props.comment}
          nameAuthor={this.props.nameAuthor}
          addToCart={product => this.props.addToCart(product)}
          totalpage={this.props.totalpage}
          page={this.props.page}
          backPage={() => this.props.backPage()}
          nextPage={() => this.props.nextPage()}
          setPage={page => this.props.setPage(page)}
        />
        <Footer />
      </div>
    );
  }
}
export default ProductDetail;
