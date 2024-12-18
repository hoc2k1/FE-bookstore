import React from 'react'

const Loading = ({isFull, isSmall}) => {
  return (
    <div className={`${isFull ? 'full-spinner' : 'spinner'}`}>
      <img className={`${isSmall ? 'loading-gif-small' : 'loading-gif'}`} alt="" src='../../../assets/images/shop/loading.gif'></img>
    </div>
  )
}
export default Loading