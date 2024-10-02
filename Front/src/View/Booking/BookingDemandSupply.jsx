import React from "react";

function BookingDemandSupply() {
  return (
    <div className="demand_supply_main">
      <div className="booking-demand">
        <div className="logo-box">
          <i className="fa-solid fa-star"></i>
        </div>
        <div className="demand-info-box">
          <p className="demand_text">This Helicopter is in high demand!</p>
          <p className="num_booking">7 travelers have booked today.</p>
        </div>
      </div>
      <div className="booking-supply">
        <div className="logo-box">
          <i className="fa-solid fa-star"></i>
        </div>
        <div className="demand-info-box">
          <p className="demand_text">This Helicopter is in high demand!</p>
          <p className="num_booking">7 travelers have booked today.</p>
        </div>
      </div>
    </div>
  );
}

export default BookingDemandSupply;
