import React from 'react'
import BannerItem from './banner.item'

const BannerGrid = ({ banners }) => {
  const data = banners.filter((item, index) => index % 2 != 0)
  return (
    <div className='mt-md-4 mt-3 row g-2 g-md-3'>
      {data.map((item, index) => {
        return (
          <div className='col-6' key={`banner-grid-${index}`}>
            <div className='banner-grid '>
              <BannerItem banner={item}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BannerGrid