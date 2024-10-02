import React from 'react'
import CheckIn from './CheckIn'

const BookingCheackin = () => {

    const checkin={
        title:"Check-in",
        date:"Thu 21 Apr 2022",
        time:"15:00 – 23:00"
    }
    const checkout={
        title:"Check-out",
        date:"Sat 30 Apr 2022",
        time:"01:00 – 11:00"
    }




  return (
    <div className='booking-checking-main'>
      <CheckIn data={{...checkin}}/>
      <CheckIn data={{...checkout}}/>
    </div>
  )
}

export default BookingCheackin
