import React from "react";

function SuccessUpper() {
  return (
    <div className="success_upper_main_box">
      <div className="success_check">
        <i className="fa-solid fa-check"></i>
      </div>
      <p className="success_upper_title">System, your order was submitted successfully!</p>
      <p className="success_upper_text">Booking details has been sent to: admin@guyvip.test</p>
    </div>
  );
}

export default SuccessUpper;
