import React, { useState } from "react";

const Index = () => {
  const [sliderYValue, setSliderYValue] = useState(100);
  const [sliderXValue, setSliderXValue] = useState(100);
  const offset = 10;
  
  const handleSliderYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderYValue(parseInt(e.target.value));
  };

  const handleSliderXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderXValue(parseInt(e.target.value));
  };

  return (
    <div>
      <h1>2D SVG</h1>
      <input
        type="range"
        min={0}
        max={100}
        value={sliderYValue}
        onChange={handleSliderYChange}
        style={{ width: 200, margin: "20px 0" }}
      />

      <p>Y Value: {sliderYValue}</p>

      <input
        type="range"
        min={0}
        max={100}
        value={sliderXValue}
        onChange={handleSliderXChange}
        style={{ width: 200, margin: "20px 0" }}
      />
      <p>X Value: {sliderXValue}</p>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        width={500}
        style={{ margin: "auto" }}
      >
        <g
          stroke="red"
          strokeWidth={0.5}
          shapeRendering="crispEdges"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="square"
        >
          <line
            x1={offset}
            y1={offset}
            x2={offset}
            y2={offset + sliderYValue}
          />
          <line
            x1={offset}
            y1={offset + sliderYValue}
            x2={offset + sliderXValue}
            y2={offset + sliderYValue}
          />
          <line
            x1={offset + sliderXValue}
            y1={offset}
            x2={offset + sliderXValue}
            y2={offset + sliderYValue}
          />
          <line
            x1={offset}
            y1={offset}
            x2={offset + sliderXValue}
            y2={offset}
          />
        </g>
        <path
          d={`M ${offset},${offset + sliderYValue} A ${
            sliderXValue / 2
          },${offset} 0 0,0 ${offset + sliderXValue},${offset + sliderYValue}`}
          fill="none"
          stroke="blue"
          strokeWidth={0.5}
        />
      </svg>
    </div>
  );
};

export default Index;
