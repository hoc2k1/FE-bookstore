import React from "react";

// Import Swiper React components
import SlideCustom from "../slide.custom/slide.custom";

const Categories = ({ categories }) => {
  const responsiveSettings = [
    {
      breakpoint: 1200,
      settings: {
          slidesToShow: 5,
          slidesToScroll: 5
      }
    },
    {
      breakpoint: 768,
      settings: {
          slidesToShow: 3,
          slidesToScroll: 3
      }
    },
    {
      breakpoint: 300,
      settings: {
          slidesToShow: 2,
          slidesToScroll: 2
      }
    }
];
  return (
    <div className="colleciton-list new-block">
      <p className="mt-2 fw-bold fs-5">Các thể loại sách</p>
      <SlideCustom
        canSwipe
        responsive={responsiveSettings}
        arrows
      >
        { categories.map((item, index) => {
          return (
            <div key={index} className="category-item">
              <img className="w-100 ratio ratio-1x1 rounded-circle category-item-image" src={item.image}></img>
              <p className="mt-2 fw-bold fs-5">{item.name}</p>
            </div>
          )
        })}
      </SlideCustom>
    </div>
  )
}

export default Categories
