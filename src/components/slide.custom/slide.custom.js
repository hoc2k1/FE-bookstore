import React from "react"
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';

const SlideCustom = ({
  children, arrows, showIndicators, responsive,
  transitionDuration, duration, vertical, slidesToShow,
  slidesToScroll, defaultIndex, autoplay, infinite,
  canSwipe
 }) => {
  const indicators = (index) => {
    if (showIndicators) {
      return (
        <div className="indicator"></div>
      )
    }
    else {
      return <div></div>
    }
  };

  const properties = {
    transitionDuration: transitionDuration || 500,
    duration: duration || 5000,
    vertical: vertical || false,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: slidesToScroll || 1,
    responsive: responsive || [],
    defaultIndex: defaultIndex || 0,
    autoplay: autoplay || false,
    infinite: infinite || false,
    canSwipe: canSwipe || false,
    arrows: arrows || false,
    prevArrow: <button className="prev-slide-button"><i className="fa fa-chevron-left" aria-hidden="true" /></button>,
    nextArrow: <button className="next-slide-button"><i className="fa fa-chevron-right" aria-hidden="true" /></button>
  }
  
  return (
    <div className="slide-container">
      <Slide indicators={indicators} transitionDuration={500} {...properties}>
        { children }
      </Slide>
    </div>
  )
}
export default SlideCustom