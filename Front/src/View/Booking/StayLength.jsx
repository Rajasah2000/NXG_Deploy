import React from "react";
import { Link } from "react-router-dom";
const StayLength = ({ stay_data }) => {
  let { text, duration, rooms, link_text } = stay_data;

  return (
    <div className="stay-duration">
      <p className="stay-length-text">{text}</p>
      <div className="stay_room_date_info">
        <p className="stay-length">{duration}</p>
        <p className="stay_room_available">{rooms}</p>
      </div>
      <Link className="stay-link" to="#">
        {link_text}
      </Link>
    </div>
  );
};

export default StayLength;
