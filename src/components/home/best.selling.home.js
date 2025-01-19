import React from 'react'
import { connect } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { checkNotEmpty } from '../../config/identify'
import Price from '../product.detail/product.price';
import { keyFilter } from '../../constants/values';

const BestSelling = (props) => {
  console.log(214, props)
  if (checkNotEmpty(props.bestSelling)) {
    const renderBestSellingItem = (item) => {
      const author = props.author.find(item1 => item1._id == item.id_author)
      const category = props.category.find(item1 => item1._id == item.id_category)
      const publisher = props.publisher.find(item1 => item1._id == item.id_publisher)
      const imageUrl = (item.img && item.img[0]) ? item.img[0] : '../../../assets/images/shop/placeholder-image.png'
      return (
        <div className='w-100'>
          <div className='w-100'>
            <a href={'/product/' + item._id}><img src={imageUrl} alt="" className="product-image"/></a>
          </div>
          <div className='mx-md-3 mx-2'>
            <div className="mt-1">
              <a href={'/product/' + item._id} className="text-link heading list-unstyled"><span>{item.name}</span></a>
            </div>
            <Price price={item.price} sales={item.sales}/>
            {category && (<span><span className="fw-bold">Thể loại: </span><a className="text-link" href={`/products/?${keyFilter.SEARCH_CATEGORY}=${category._id}`}>{category.name}</a><br/></span>)}
            {author && (<span><span className="fw-bold">Tác giả: </span><a className="text-link" href={`/products?${keyFilter.SEARCH_AUTHOR}=${author._id}`}>{author.name}</a><br/></span>)}
            {publisher && (<span><span className="fw-bold">Nhà sản xuất: </span><a className="text-link" href={`/products?${keyFilter.SEARCH_PUBLISHER}=${publisher._id}`}>{publisher.name}</a></span>)}
          </div>
        </div>
      )
    }
    return (
      <div className='mt-md-4 mt-3'>
        <span className='heading'>Top sản phẩm bán chạy</span>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mt-md-3 mt-2"
        >
          {props.bestSelling.map((item, index) => {
            return (
              <SwiperSlide key={`best-selling-${index}`} className='w-50 w-md-25'>
                {renderBestSellingItem(item)}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    )
  }
  else return null
}

const mapStateToProps = state => ({
  bestSelling: state.productReducers.product.bestSelling,
  category: state.homeReducers.category.data,
  publisher: state.homeReducers.publisher.data,
  author: state.homeReducers.author.data
})

export default connect(mapStateToProps, null)(BestSelling)