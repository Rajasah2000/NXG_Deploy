import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import RangeSlider from "../Home/RangeSlider";

function CruiseCardModal({ setOpen, filter_type, port, cruise_type }) {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(10000);
  function handleRanges(value) {
    console.log("range");
    setFirstValue(value[0]);
    setSecondValue(value[1]);
    // console.log(value);
  }
  return (
    <>
      <div className="responsive-europe-filter-box">
        <div className="responsive_filter_box_main">
          <div className="closeButton" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark closeButton"></i>
          </div>
          <div className="responsive-europe-main-box">
            <div className="europe-filter-conts">
              <p className="filter-title">Cabin type</p>
              {filter_type.map((ele, index) => {
                return (
                  <div key={index} className="filter-check-lists">
                    <div className="filter-check-inner">
                      <input type="checkbox" />
                      <li className="filter-texts">{ele.text}</li>
                    </div>
                    <li className="filter-amount">{ele.amount}</li>
                  </div>
                );
              })}
            </div>
            <div className="europe-filter-conts">
              <p className="filter-title pt-1">Other</p>
              <div className="filter-check-lists">
                <div className="filter-check-inner">
                  <input type="checkbox" />
                  <p className="filter-texts">FreeCancelation</p>
                </div>
                <p className="filter-amount">92</p>
              </div>
            </div>
            <div className="europe-filter-conts">
              <p className="filter-title pt-1">Price</p>
              {/* <RangeSlider /> */}
              <div>
                <div className="display">
                  <span> ${firstValue}</span>-<span> ${secondValue}</span>
                </div>
                <MultiRangeSlider
                  min={0}
                  max={100}
                  step={1}
                  onChange={handleRanges}
                />
              </div>
            </div>
            <div className="europe-filter-conts">
              <p className="filter-title">Helicopter type</p>
              {cruise_type.map((ele, index) => {
                return (
                  <div key={index} className="filter-check-lists">
                    <div className="filter-check-inner">
                      <input type="checkbox" />
                      <li className="filter-texts">{ele.text}</li>
                    </div>
                    <li className="filter-amount">{ele.amount}</li>
                  </div>
                );
              })}
            </div>
            <div className="europe-filter-conts border-b">
              <p className="filter-title">Port</p>
              {port.map((ele, index) => {
                return (
                  <div key={index} className="filter-check-lists">
                    <div className="filter-check-inner">
                      <input type="checkbox" />
                      <li className="filter-texts">{ele.text}</li>
                    </div>
                    <li className="filter-amount">{ele.amount}</li>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CruiseCardModal;
