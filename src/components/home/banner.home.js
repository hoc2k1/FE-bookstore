import React from "react";
import SlideCustom from "../slide.custom/slide.custom";
import { Link } from "react-router-dom";

const Banner = ({ banners }) => {
  return (
    <div className="banner-container">
      <SlideCustom 
        arrows
        showIndicators
        autoplay
        infinite
        canSwipe
      >
        {banners.map((banner, index)=> {
          if (!banner.type) {
            if (banner.url && /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(banner.url)) {
              return (
                <div key={index}>
                  <a href={banner.url} target="_blank" rel="noopener noreferrer">
                    <img alt="" src={banner.image} className="w-100 banner-image" />
                  </a>
                </div>
              )
            }
            else {
              return (
                <div key={index}>
                  <img src={banner.image} className="w-100 banner-image" />
                </div>
              )
            }
          }
          else {
            if (banner.url) {
              return (
                <div key={index}>
                  <Link to={banner.url}> 
                    <img src={banner.image} className="w-100 banner-image" />
                  </Link>
                </div>
              )
            }
            else {
              return (
                <div key={index}>
                  <img src={banner.image} className="w-100 banner-image" />
                </div>
              )
            }
          }
        })} 
      </SlideCustom>
    </div>
  )
}

export default Banner
