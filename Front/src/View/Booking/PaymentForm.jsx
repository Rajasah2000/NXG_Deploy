import React from "react";
import debit_pic from "../../Images/card.png";
function PaymentForm() {
  return (
    <div className="w-100 booking-payment-main">
      <form action="/backend" className="w-100">
        <div className="payment_form_field">
          <input
            type="text"
            name="payment_method"
            placeholder="Select payment method *"
          />
        </div>
        <div className="card_holder_section">
          <div className="card_holder_info">
            <div className="payment_form_field">
              <input
                type="text"
                name="holder_name"
                placeholder="Card holder name *"
              />
            </div>
            <div className="payment_form_field">
              <input
                type="text"
                name="card_number"
                placeholder="Credit/debit card number *"
              />
            </div>
            <div className="cvc-section">
              <div className="payment_form_field">
                <input
                  type="text"
                  name="holder_name"
                  placeholder="Expiry date *"
                />
              </div>
              <div className="payment_form_field">
                <input
                  type="text"
                  name="holder_name"
                  placeholder="CVC/CVV *"
                />
              </div>
            </div>
          </div>
          <div className="card_holder_img">
            <img src={debit_pic} alt="" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
