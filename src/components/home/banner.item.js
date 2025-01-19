import React from 'react' 

const BannerItem = ({ banner }) => {
  return (
    <div className='w-100 h-100'>
      {banner.url ? (
        <a href={banner.url} className="cursor-pointer">
          <img src={banner.image} className="banner-item" />
        </a>
      ) : (
        <img src={banner.image} className="banner-item" />
      )}
    </div>
  )
}

export default BannerItem