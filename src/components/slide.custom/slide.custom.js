import React from "react"
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';

const indicators = (index) => (
  <div className="indicator"></div>
);

const properties = {
  prevArrow: <button className="prev-slide-button"><i class="fa fa-chevron-left" aria-hidden="true" /></button>,
  nextArrow: <button className="next-slide-button"><i class="fa fa-chevron-right" aria-hidden="true" /></button>
}

const SlideCustom = ({ children }) => {
  return (
    <Slide indicators={indicators} transitionDuration={500} {...properties}>
      { children }
    </Slide>
  )
}
export default SlideCustom