import React, { Component } from 'react'
import Header from '../header/header'
import ContentHome from './content.home'
import FooterTop from '../footer/footer.top'
import FooterMiddle from '../footer/footer.middle'
import FooterBottom from '../footer/footer.bottom'
const Home = ({ islogin, logout, category,
  publisher, book, totalpage, backPage,
  nextPage, setPage, page, sortType, setSortType,
  setRangeType, title, setTitle, setBranch, branch,
  setSearchText, author, setIDBranch, branchClick, history,
  searchTextSubmit, addToCart }) => (
  <div>
    <Header
      islogin={islogin}
      logout={() => logout()}
      history={history}
    />
    <ContentHome
      category={category}
      publisher={publisher}
      book={book}
      totalpage={totalpage}
      backPage={() => backPage()}
      nextPage={() => nextPage()}
      setPage={(page) => setPage(page)}
      page={page}
      setRangeType={(range) => setRangeType(range)}
      title={title}
      setTitle={(title) => setTitle(title)}
      setBranch={(branch) => setBranch(branch)}
      branch={branch}
      author={author}
      setIDBranch={(id) => setIDBranch(id)}
      branchClick={(branch, id) => branchClick(branch, id)}
      addToCart={(product) => addToCart(product)}
    />
    <footer id="footer">
      <FooterTop />
      <FooterMiddle />
      <FooterBottom />
    </footer>
  </div>

)

export default Home
