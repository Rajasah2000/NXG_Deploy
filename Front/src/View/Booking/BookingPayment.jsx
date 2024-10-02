import React from 'react'
import PaymentForm from './PaymentForm'

function BookingPayment() {
  return (
    <div className='booking_payment_main'>
      <p className='form_text'>How do you want to pay?</p>
      <div className="booking_button_boxes">
        <button className='btn btn-primary btn-lg'>
            Credit/Debit Card
        </button>
        <button className='btn btn-secondary btn-lg mx-3'>
           Digital Payment
        </button>
      </div>
      <div className="payment_form">
        <PaymentForm/>
      </div>
    </div>
  )
}

export default BookingPayment
