import React from "react";
import Banner from "./Banner";
import PopularDestiny from "./PopularDestiny";
import FeaturedCruse from "./FeaturedCruse";
import CruiseBooking from "./CruiseBooking";
import WhyUs from "./WhyUs";
import Recommended from "./Recommended";
import Inspire from "./Inspire";
import Review from "./Review";
import AirCharterService from "./AirCharterService";
import WhenCharterHelicopter from "./WhenCharterHelicopter";
import HelicopterCharterEnquiry from "./HelicopterCharterEnquiry";
import HelicopterSearch from "./HelicopterSearch";
const Index = () => {
  return (
    <>
      <div className="banner-section">
        <Banner />
      </div>
      <HelicopterSearch />
      {/* <div className="popular-destiny">
        <PopularDestiny />
      </div> */}

      <div className="popular-destiny" style={{ background: "#f5f6f8" }}>
        <AirCharterService />
      </div>

      <WhenCharterHelicopter />


      {/* <div className="feature-cruse">
        <FeaturedCruse />
      </div> */}

      <div className="cruise-booking">
        <CruiseBooking />
      </div>

      <div className="why-us">
        <WhyUs />
      </div>

      {/* <HelicopterCharterEnquiry /> */}

      {/* <div className="recomended-section">
        <Recommended />
      </div> */}

      <div className="">
        <Review />
      </div>
      <div className="inspire_section">
        <Inspire />
      </div>
    </>
  );
};

export default Index;
