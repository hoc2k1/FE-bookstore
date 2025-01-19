import React from 'react'
import BannerItem from './banner.item'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerSlide = ({ banners }) => {
  const data = banners.filter((item, index) => index % 2 == 0)
  return (
    <div className='mt-md-4 mt-3'>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        cssMode={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-100"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={`banner-slide-${index}`}>
              <div className='banner-slide'>
                <BannerItem banner={item}/>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default BannerSlide