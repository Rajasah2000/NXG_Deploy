import React from "react";
import { Link } from "react-router-dom";
import BookingForm from "./BookingForm";
import BookingDemandSupply from "./BookingDemandSupply";
import BookingPayment from "./BookingPayment";
import PostPayment from "./PostPayment";
function BookingPersoninformation() {
  return (
    <div className="personinfo_main_box">
      <div className="invite_box">
        <p className="booking_register_text">
          Sign in to book with your saved details or{" "}
          <Link className="register_link"> register </Link> to manage your
          bookings on the go!
        </p>
      </div>
      <div className="person_info_form">
        <BookingForm />
      </div>
      <div className="booking_demand_supply_box mt-5">
        <BookingDemandSupply />
      </div>
      <div className="booking_payment_box mt-3">
        <BookingPayment />
      </div>
      <div className="post_payment_box mt-3 mb-5">
        <PostPayment />
      </div>
      {/* <div className="book_now_main">
        <input type="checkbox" className="book_now_input" />
        <span>
          Get access to members-only deals, just like the millions of other
          email subscribers
        </span>
        <div className="form_submit_btn">
          <Link to="/success" className="btn btn-primary btn-link">
            Book Now <div className="btn-arrow icon-arrow-top-right"></div>
          </Link>
        </div>
      </div> */}

      <div className="row y-gap-20 items-center justify-between">
        <div className="col-auto">
          <div className="d-flex items-center">
            <div className="form-checkbox ">
              <input type="checkbox" name="name" />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
            </div>
            <div className="text-14 lh-10 text-light-1 ml-10">
              Get access to members-only deals, just like the millions of other email subscribers
            </div>
          </div>
        </div>
        <div className="col-auto">
          <a className="button h-60 px-24 -dark-1 bg-blue-1 text-white" href="/success">
            Book Now
            <div className="icon-arrow-top-right ml-15" />
          </a>
        </div>
      </div>

    </div>
  );
}

export default BookingPersoninformation;
