import React from "react";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import BannerSlider from "./BannerSlider";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <>
      <div id="cruise_banner_section" className="cust-carousel-box">
        <BannerSlider />

        {/* <div className="banner-cust-box2">
        <div className="text-center border-right padd-ri banner-cust-box2-conts">
          <p className="cruise_detail_text">Where to</p>
          <p className="fs-6 fw-light">All Docs</p>
        </div>
        <div className=" text-left border-right padd-ri banner-cust-box2-conts">
          <p className=" cruise_detail_text">All Helicopter Line</p>
          <p className="fs-6  fw-light">Guyana</p>
        </div>
        <div className="text-left banner-cust-box2-conts">
          <p className="cruise_detail_text">Departure Month</p>
          <p className="fs-6  fw-light">June</p>
        </div>
        <div className=" banner-cust-box2-conts btn-box" style={{marginLeft:'auto'}}>
          <Link to='/cruiselist'><button className="btn btn-warning text-center banner-btn ">
            <span className="banner-btn-icon"></span>Search
          </button></Link>
        </div>
      </div>
      <div className="cust-cont-3">
        <div className="cust-cont3-box">
          <p className="py-2 cruise_detail_text">Where to</p>
          <p className="fs-6  fw-light">All Destination</p>
        </div>
        <div className="cust-cont3-box">
          <p className="py-2 cruise_detail_text">Departure Month</p>
          <p className="fs-6 fw-light">June</p>
        </div>
        <div className="cust-cont3-box">
        <p className="py-2 cruise_detail_text">All Helicopter Line</p>
          <p className="fs-6 fw-light">Guyana</p>
        </div>
        <div className="mt-3 cust-cont3-box no-bdr">
         <Link to='/cruiselist'><button className="btn btn-warning btn-lg p-3 text-center banner-btn">
            <span className="banner-btn-icon"></span>Search
          </button></Link> 
        </div>
      </div> */}
        <div className="cust-box-4">
          <a href="#secondSection" className="cust-box4-link">
            <div className="box-4-text">
              {/* <p className="scroll-texts">Scroll down</p> */}
              {/* <p className="scroll-texts">to discover more</p> */}
            </div>
            <div className="scroll-box">
              <div className="scroll"></div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;
