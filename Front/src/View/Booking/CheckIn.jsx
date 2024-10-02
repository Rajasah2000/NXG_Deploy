import React from 'react'

const CheckIn = ({data}) => {
    let {title,date,time}=data;
  return (
    <div className='checkin_main'>
      <p className="check-title">{title}</p>
      <p className="check-date">{date}</p>
      <p className="check-time">{time}</p>
    </div>
  )
}

export default CheckIn
