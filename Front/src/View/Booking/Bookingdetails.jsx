import React from "react";
import BookingHotel from "./BookingHotel";
import BookingCheackin from "./BookingCheackin";
import StayLength from "./StayLength";
import BookingPrice from "./BookingPrice";
import AdvancePayment from "./AdvancePayment";
import BookingPromo from "./BookingPromo";
import JourneyStart from "./JourneyStart";

function Bookingdetails() {
  const stayLength = [
    {
      text: "Total length of stay:",
      duration: "9 days",
      rooms: "",
      link_text: "Travelling on different dates?",
    },
    {
      text: "You selected:",
      duration: "Superior Double Studio",
      rooms: "1 room, 4 adult",
      link_text: "Change your selection",
    },
  ];

  return (
    <>
      <div className="cruise_booking_detail_main">
        <div className="booking_hotel_detail">
          <p className="booking_detail_text">Your booking details</p>
          <BookingHotel />
          <BookingCheackin />
          {stayLength.map((ele, i) => (
            <StayLength key={i} stay_data={{ ...ele }} />
          ))}
        </div>
        <div className="booking_price_summary">
          <p className="booking_detail_text">Your price summary</p>
          <BookingPrice />
        </div>
        <div className="booking_price_summary advance_payment_section">
          <p className="booking_detail_text">Your payment schedule</p>
          <AdvancePayment />
        </div>
        <div className="booking_price_summary promo_code-section">
          <p className="booking_detail_text">Do you have a promo code?</p>
          <BookingPromo />
        </div>
      </div>
    </>
  );
}

export default Bookingdetails;
