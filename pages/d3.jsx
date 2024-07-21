import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Index = () => {
  const [sliderYValue, setSliderYValue] = useState(100);
  const [sliderXValue, setSliderXValue] = useState(100);
  const svgRef = useRef(null);
  const offset = 10;

  const handleSliderYChange = (e) => {
    setSliderYValue(parseInt(e.target.value));
  };

  const handleSliderXChange = (e) => {
    setSliderXValue(parseInt(e.target.value));
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll("*").remove();

    // Combine paths and lines into a single path string
    const pathData = `
      M ${offset},${offset} 
      L ${offset},${offset + sliderYValue}
      M ${offset + sliderXValue},${offset} 
      L ${offset + sliderXValue},${offset + sliderYValue}
      M ${offset},${offset + sliderYValue}
      A ${sliderXValue / 2},${offset} 0 0,0 ${offset + sliderXValue},${offset + sliderYValue}
      M ${offset},${offset}
      A ${sliderXValue / 2},${offset} 0 0,1 ${offset + sliderXValue},${offset}
    `;

    // Draw the combined path
    svg
      .append("path")
      .attr("d", pathData)
      .attr("fill", "white")
      .attr("stroke", "blue")
      .attr("stroke-width", 0.5)
      .attr("vector-effect", "non-scaling-stroke");
  }, [sliderXValue, sliderYValue]);

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
        ref={svgRef}
        viewBox="0 -10 200 200"
        xmlns="http://www.w3.org/2000/svg"
        width={500}
        style={{ margin: "auto" }}
      ></svg>
    </div>
  );
};

export default Index;
