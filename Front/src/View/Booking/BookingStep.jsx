import React from 'react'

function BookingStep() {
  return (
    <div className='cruise_step_box'>
      <div className="step-boxes">
        <div className="step-number cheacked">
        <i className="fa-solid fa-check"></i>
        </div>
        <p className='steps'>Your selection</p>
      </div>
      <div className="separate-line"></div>
      <div className="step-boxes">
        <div className="step-number">
            2
        </div>
        <p className='steps'>Your details</p>
      </div>
      <div className="separate-line"></div>
      <div className="step-boxes">
        <div className="step-number">
           3
        </div>
        <p className='steps'>Final step</p>
      </div>
    </div>
  )
}

export default BookingStep
