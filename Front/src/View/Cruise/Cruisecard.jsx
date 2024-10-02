import React from "react";
import { Link } from "react-router-dom";

function Cruisecard({ data }) {
  let {
    cru_image,
    cru_name,
    rating,
    review,
    cru_journey,
    journey_date,
    dept_place,
    Arive_ports,
    price,
  } = data;

  return (
    <div className="row py-3">
      <div className="col-12">
        <div className="cruise-card-main-cont">
          <div className="px-1 cruise-card-image-box">
            <img src={cru_image} className="cru-image" alt="" />
            <div className="img-heart-box">
              <i class="fa-regular fa-heart"></i>
            </div>
          </div>
          <div className="cruise-card-detail-box">
            <div className="cruisecard-detail ">
              <div className="cruise-journey-details">
                <p className="cruise_name">{cru_name}</p>
                <p className="cruise-journey">{cru_journey}</p>
                <div className="journey-more-detail">
                  <div className="dd-conts">
                    <p className="journy-details">Flying Date</p>
                    <p className="dept-date">{journey_date}</p>
                  </div>
                  <div className="dd-conts">
                    <p className="journy-details">Departs</p>
                    <p className="dept-date">{dept_place}</p>
                  </div>
                  <div className="dd-conts">
                    <p className="journy-details">Ports (7)</p>
                    <p className="dept-date place">{Arive_ports}</p>
                  </div>
                </div>
              </div>
              <div className="cruise-price-review-detail">
                <p className="rating-review-box">
                  <span className="cruise-rating">{rating}</span>
                  <span className="cruise-public-review">{review}</span>
                </p>
                <div className="jour-price-box">
                  <p>From</p>
                  <p className="journey-price">{price}</p>
                  <p className="fw-light">Per Adult</p>
                </div>
                <div className="review-price-btn-box">
                  <Link
                    to="/cruisebooking"
                    className="btn btn-primary review-price-btn"
                  >
                    View Detail{" "}
                    <div className="btn-arrow icon-arrow-top-right"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cruisecard;
