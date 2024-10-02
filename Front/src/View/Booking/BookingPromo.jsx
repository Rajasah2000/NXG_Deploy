import React from "react";

function BookingPromo() {
  return (
    <div className="promo_code_main">
      <div className="promo_input">
        <input type="text" name="promo" placeholder="Enter promo code" />
      </div>
      <button type="button" className="btn btn-lg btn-outline-primary">
        Apply
      </button>
    </div>
  );
}

export default BookingPromo;
