import React from 'react'

function CustomerCard({data}) {
    let {hotel,desc,image,deg,name}=data
  return (
    <div className='customer_card'>
      <div className="customercardbox">
        <div className="card_upper">
            <p className='destination_review'>{hotel}</p>
            <p className='review_description'>{desc}</p>
        </div>
        <div className="card_lower">
            <div className="review_image_box">
                <img src={image} alt="pic" />
            </div>
            <div className="customer_desc">
                <p className='customer_name'>{name}</p>
                <p className='designation'>{deg}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerCard
