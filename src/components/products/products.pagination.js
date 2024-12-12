import React from 'react'

const ProductsPagination = (props) => {
  const renderListPagination = () => {
    for (let i=1; i<= parseInt(props.totalPage); i++) {
      return (
        <a className="products-pagination">
          <span>{i}</span>
        </a>
      )
    }
  }
  return (
    <div>
      {renderListPagination()}
    </div>
  )
}

export default ProductsPagination