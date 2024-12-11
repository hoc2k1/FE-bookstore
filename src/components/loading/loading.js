import React from 'react'

const Loading = ({isFull}) => {
  return (
    <div className={`${isFull ? 'full-spinner' : 'spinner'}`}>
      <img className='loading-gif' alt="" src='../../../assets/images/shop/loading.gif'></img>
    </div>
  )
}
export default Loading