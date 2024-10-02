import React from "react";
import { Link } from "react-router-dom";
function BookingForm() {
  return (
    <div className="booking_form">
      <p className="form_text">Let us know who you are</p>
      <form action="/backend" className="info_form" method="post">
        <div className="input-box">
          <input type="text" name="name" placeholder="Full Name" />
        </div>
        <div className="mail-phone">
          <div className="input-box w-47">
            <input type="email" name="email" placeholder="Email" />
          </div>
          <div className="input-box w-47">
            <input type="phone" name="phone" placeholder="Your Number" />
          </div>
        </div>
        <div className="input-box">
          <input type="text" name="address1" placeholder="Address line 1" />
        </div>
        <div className="input-box">
          <input type="text" name="address2" placeholder="Address line 2" />
        </div>
        <div className="mail-phone">
          <div className="input-box w-47">
            <input
              type="text"
              name="state"
              placeholder="State/Province/Region"
            />
          </div>
          <div className="input-box w-47">
            <input
              type="number"
              name="postal_code"
              placeholder="ZIP code/Postal code"
            />
          </div>
        </div>
        <div className="input-box">
          <textarea
            name="message"
            className="p-3"
            placeholder="Speacial Requests"
            rows="5"
          ></textarea>
        </div>
      </form>
      <p className="check_text">
        By proceeding with this booking, I agree to GoTrip Terms of Use and
        Privacy Policy.
      </p>
      <div className="form_submit_btn">
        <Link to="#" className="btn btn-primary btn-link">
          Next:Final details{" "}
          <div className="btn-arrow icon-arrow-top-right"></div>
        </Link>
      </div>
    </div>
  );
}

export default BookingForm;
