import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

const MyComponent = () => {

  // State to manage the slider values
  const [values, setValues] = useState([2000]);


  // Handle slider value change
  const handleSliderChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <>
      <p>
        <span className="min-value">$0 - </span>
        <span>
          $ <output id="max_value">{values}</output>
        </span>
      </p>
      <div>
        <MultiRangeSlider
          min={0}
          max={values}
          step={100}
          values={values}
          onChange={handleSliderChange}
        />
      </div>
    </>
  );
};

export default MyComponent;
