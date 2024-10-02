import React from 'react'

function OrderDetails() {
  return (
    <div className='order_details_main'>
      <div className="order-detailing_box">
        <div className="detailing">
            <p className='order_num_text'>Order Number</p>
            <p className='order_num'>13119</p>
        </div>
        <div className="detailing">
            <p className='order_num_text'>Date</p>
            <p className='order_num'>27/07/2021</p>
        </div>
        <div className="detailing">
            <p className='order_num_text'>Total</p>
            <p className='order_num'>$40.10</p>
        </div>
        <div className="detailing">
            <p className='order_num_text'>Payment Method</p>
            <p className='order_num'>Direct Bank Transfer</p>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
