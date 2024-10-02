import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import RangeSlider from '../Home/RangeSlider';

function CruiseFilter() {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(10000);
  function handleRanges(value) {
    console.log("range");
    setFirstValue(value[0]);
    setSecondValue(value[1]);
    // console.log(value);
  }

    const filter_type = [
        {
          text: "inside",
          amount: "92",
        },
        {
          text: "Outside",
          amount: "92",
        },
        {
          text: "Suite",
          amount: "92",
        },
        {
          text: "Balcony",
          amount: "92",
        },
      ];
    
      const cruise_type = [
        {
          text: "Family Helicopters",
          amount: "92",
        },
        {
          text: "Luxary Helicopters",
          amount: "45",
        },
        {
          text: "River Helicopters",
          amount: "21",
        },
      ];
    
      const port = [
        {
          text: "Family Helicopters",
          amount: "92",
        },
        {
          text: "Luxary Helicopters",
          amount: "45",
        },
        {
          text: "River Helicopters",
          amount: "21",
        },
      ];



  return (
    <>
    <div className="europe-filter-box">
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
    </>
  )
}

export default CruiseFilter
