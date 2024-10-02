import React from "react";

function CruiseHeading() {
  return (
    <>
      <div className="europe-heading-box">
        <p className="list1-heading">Guyana Helicopters</p>
        <div className="banner-cust-box2 list1-second-cont">
          <div className="banner-cust-box2-conts border-ri list1-first">
            <p className=" ques">Where to</p>
            <p className="fs-6 fw-light">All Destinations</p>
          </div>
          <div className="banner-cust-box2-conts border-ri">
            <p className=" ques">All Helicopter Line</p>
            <p className=" fw-light">Guyana</p>
          </div>
          <div className="banner-cust-box2-conts">
            <p className=" ques">Departure Month</p>
            <p className="  fw-light">June</p>
          </div>
          <div className="banner-cust-box2-conts list-btn-box">
            <button className="btn btn-warning btn-lg banner-btn list-btn">
              <span className="banner-btn-icon"></span>Search
            </button>
          </div>
        </div>
        {/* <div className="w-100 cust-cont-3">
          <div className="cust-cont3-box">
            <p className=" fw-bold p-1">Where to</p>
            <p className=" fw-light">All Docs</p>
          </div>
          <div className="cust-cont3-box">
            <p className=" fw-bold p-1">Departure Month</p>
            <p className=" fw-light">June</p>
          </div>
          <div className="cust-cont3-box">
            <p className=" fw-bold p-1">All Helicopter Line</p>
            <p className="  fw-light">Guyana</p>
          </div>
          <div className="mt-3 cust-cont3-box no-bdr">
            <button className="btn btn-warning btn-lg p-3 text-center banner-btn list-btn">
              <span className="banner-btn-icon"></span>Search
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default CruiseHeading;
