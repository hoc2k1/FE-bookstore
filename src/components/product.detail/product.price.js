import React from 'react'
import { currency } from '../../constants/values'

const Price = ({sales = 0, price}) => {
  if ( sales != 0 ) {
    let newPrice = parseInt(price) * (100 - parseInt(sales)) / 100
    if (newPrice < 0) {
      newPrice = 0
    }
    return (
      <div>
        <span className="heading d-flex align-items-center">
          <span className="color-price-after-sale">{newPrice}<sup>{currency}</sup></span>
          &nbsp;&nbsp;&nbsp;
          <span className="color-price-before-sale heading-small">{price}<sup>{currency}</sup></span>
        </span>
      </div>
    )
  }
  else {
    return (
      <div>
        <span className="heading">
          <span className="color-price-after-sale">{price}<sup>{currency}</sup></span>
        </span>
      </div>
    )
  }
}

export default Price