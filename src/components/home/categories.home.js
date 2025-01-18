import React from "react";

const Categories = ({ categories, history }) => {
  return (
    <div className="colleciton-list mt-md-4 mt-3">
      <p className="mt-2 fw-bold fs-5">Các thể loại sách</p>
      <div className="row mt-md-3 mt-2 gx-2 gx-md-3 gx-lg-4 gap-y-grid">
        { categories.map((item, index) => {
          return (
            <div key={index} className="category-item cursor-pointer col-6 col-md-4 col-lg-3" onClick={() => history.push({pathname: '/products', search: `searchCategory=${item._id}` })}>
              <img className="w-100 ratio ratio-1x1 rounded-circle category-item-image" src={item.image}></img>
              <p className="mt-2 fw-bold fs-5">{item.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Categories
