import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function () {
    const [min,setMin]=useState(0);
    const [max,setMax]=useState(2000);
  return (
    <>
      <p className="input_values">
        <span className="min-value">${min} - </span>
        <span>
          $<output id="max_value">{max}</output>
        </span>
      </p>
      <RangeSlider className="range_field" />
    </>
  );
}
