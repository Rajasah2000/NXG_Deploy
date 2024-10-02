import React from "react";
import BookingStep from "./BookingStep";
import BookingPersoninformation from "./BookingPersoninformation";
import Bookingdetails from "./Bookingdetails";
import WhyChooseUs from "./WhyChooseUs";
import logo1 from "../../Images/logos/protection_logo.svg";
import logo2 from "../../Images/logos/bag.svg";
import logo3 from "../../Images/logos/customer_care.svg";
import JourneyStart from "./JourneyStart";
import WhyUs from "../Home/WhyUs";

function CruiseBooking() {
  const our_desc = [
    {
      img: logo1,
      title: "Best Price Guarantee",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: logo2,
      title: "Easy & Quick Booking",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: logo3,
      title: "Customer Care 24/7",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <>
         <div className="" style={{    background: '#000',
    height: '90px'}}/>
      <div className="cruise_booking_section">
        <div className="container">
          <div className="booking_main_box">
            <div className="booking_step_box">
              <BookingStep />
            </div>
            <div className="booking_information_section">
              <div className="booking-person-information">
                <BookingPersoninformation />
              </div>
              <div className="booking-details">
                <Bookingdetails />
              </div>
            </div>
          </div>
          <div className="why_choose_us_section">
            {/* <p className="why-us-title">Why Choose Us</p>
            <p className="why-us-text">
              These popular destinations have a lot to offer
            </p> */}
            {/* <WhyChooseUs data={[...our_desc]} /> */}
            <WhyUs />
          </div>
        </div>
      </div>
      <div className="journey_start_section">
        <div className="container">
          <JourneyStart/>
        </div>
      </div>
    </>
  );
}

export default CruiseBooking;
