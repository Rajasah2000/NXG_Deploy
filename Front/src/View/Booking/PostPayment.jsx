import React from "react";

function PostPayment() {
  return (
    <div className="post_payment_main" style={{marginBottom:"30px"}}>
      <div className="booking_button_boxes">
        <button className="btn btn-primary btn-lg">Credit/Debit Card</button>
        <button className="btn btn-secondary btn-lg mx-3">
          Digital Payment
        </button>
      </div>
      <div className="post_payment_info">
        <input type="text" placeholder="Select Payment method *" />
      </div>
      <ol className="post_payment_text_list">
        <li>
          <p className="post_payment_text">
            You have chosen to pay by PayPal. You will be forwarded to the
            PayPal website to proceed with this transaction.
          </p>
        </li>
        <li>
          <p className="post_payment_text">
            The total amount you will be charged is: $2,338.01
          </p>
        </li>
      </ol>
    </div>
  );
}

export default PostPayment;
