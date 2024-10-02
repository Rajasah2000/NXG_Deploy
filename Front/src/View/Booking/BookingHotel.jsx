import React from "react";
import hotel_pic from "../../Images/th (4).jpg";
function BookingHotel() {
  return (
    <div className="hotel-detail-main">
      <div className="hotel_img_box">
        <img src={hotel_pic} alt="hotel_pic" />
      </div>
      <div className="hotel_detail_category">
        <div className="hotel_star_box">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
        <p className="hotel_title">
        Bell 412EP Helicopter to the Western Mediterranean
        </p>
        <p className="hotel_desc">Westminster Borough, Guyana</p>
        <div className="hotel_rating_box">
            <span className="hotel_rating">4.8</span>
            <span className="hotel-rating-text">Exceptional</span>
        </div>
        <p className="hotel-review">3,014 reviews</p>
      </div>
    </div>
  );
}

export default BookingHotel;
