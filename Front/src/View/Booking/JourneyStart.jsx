import React from "react";

function JourneyStart() {
  return (
    <div className="journey_start">
      <div className="journey_start_main">
        <div className="journey_start_left">
          <div className="journey_icon_box"></div>
          <div className="journey_desc_box">
            <p className="journey_desc_title">
              Your Travel Journey Starts Here
            </p>
            <p className="journey_desc_text">
              Sign up and we'll send the best deals to you
            </p>
          </div>
        </div>
        <div className="journey_start_right">
          <div className="journey_input_box">
            <input
              type="email"
              className="journey_input"
              placeholder="Your Email"
            />
          </div>
          <button className="btn btn-primary btn-lg">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default JourneyStart;
