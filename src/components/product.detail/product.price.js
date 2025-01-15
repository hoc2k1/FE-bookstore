import React from 'react'
import { currency, packPrice } from '../../constants/values'

const Price = ({ sales = 0, price, isSmall, times = 1, hiddenSales = false, multiLine=false, isPackage=false }) => {
  if ( sales != 0 && !hiddenSales ) {
    let newPrice = parseInt(price) * (100 - parseInt(sales)) / 100 * times
    if (newPrice < 0) {
      newPrice = 0
    }
    return (
      <div>
        <span className={`heading${isSmall ? '-small' : ''} d-flex ${multiLine ? 'flex-column' : ''} align-items-center`}>
          <span className="color-price-after-sale">{newPrice + (isPackage ? packPrice * times : 0)}<sup>{currency}</sup></span>
          {!multiLine && (<span>&nbsp;&nbsp;&nbsp;</span>)}
          <span className="color-price-before-sale heading-small">{parseInt(price) * times + (isPackage ? packPrice * times : 0)}<sup>{currency}</sup></span>
        </span>
      </div>
    )
  }
  else {
    return (
      <div>
        <span className={`heading${isSmall ? '-small' : ''}`}>
          <span className="color-price-after-sale">{parseInt(price) * times + (isPackage ? packPrice * times : 0)}<sup>{currency}</sup></span>
        </span>
      </div>
    )
  }
}

export default Price