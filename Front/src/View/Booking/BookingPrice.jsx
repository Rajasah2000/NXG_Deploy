import React from "react";

function BookingPrice() {
  const price_element = ["Superior Twin", "Taxes and fees", "Booking fees"];
  const price_amount = ["US$3,372.34", "US$674.47", "FREE"];
  return (
    <div className="booking_price_summary_main">
      <div className="booking_price_details">
        <div className="booking_price_list">
          {price_element.map((element, i) => {
            return (
              <li key={i} className="booking-price-element">
                {element}
              </li>
            );
          })}
        </div>
        <div className="booking_price_list price_lists">
          {price_amount.map((element, i) => {
            return (
              <li key={i} className="booking-price-element">
                {element}
              </li>
            );
          })}
        </div>
      </div>
      <div className="price_total_box">
        <p className="booking_main-price">Price</p>
        <p className="booking_main-price">US$4,046.81</p>
      </div>
    </div>
  );
}

export default BookingPrice;
