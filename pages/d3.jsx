import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Index = () => {
  const [sliderValues, setSliderValues] = useState({ x: 100, y: 100 });
  const svgRef = useRef(null);
  const offset = 30;

  const handleSliderChange = (axis, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [axis]: parseInt(value),
    }));
  };

  const draw = () => {
    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll("*").remove();

    const { x, y } = sliderValues;

    const appendLine = (line) => {
      svg
        .append("path")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 0.5)
        .attr("vector-effect", "non-scaling-stroke");
    };

    const topValveBaseLeft = d3.line()([
      [x / 2 + offset - 10, 10],
      [x / 2 + offset - 10, 25],
    ]);
    appendLine(topValveBaseLeft);

    const topValveBaseRight = d3.line()([
      [x / 2 + offset + 10, 10],
      [x / 2 + offset + 10, 25],
    ]);
    appendLine(topValveBaseRight);

    const topValveBaseTop = d3.line()([
      [x / 2 + offset - 10, 10],
      [x / 2 + offset + 10, 10],
    ]);
    appendLine(topValveBaseTop);

    // top of top valve
    svg
      .append("rect")
      .attr("x", x / 2 + offset - 12)
      .attr("y", 8)
      .attr("width", +(x / 2 + offset + 12) - (x / 2 + offset - 12))
      .attr("height", 2)
      .attr("fill", "#000");

    // contains sides and arcs of cylinder
    const pathData = `
      M ${offset},${offset} 
      L ${offset},${offset + y}
      M ${offset + x},${offset} 
      L ${offset + x},${offset + y}
      M ${offset},${offset + y}
      A ${x / 2},${offset / 2} 0 0,0 ${offset + x},${offset + y}
      M ${offset},${offset}
      A ${x / 2},${offset / 2} 0 0,1 ${offset + x},${offset}
    `;

    svg
      .append("path")
      .attr("d", pathData)
      .attr("fill", "white")
      .attr("stroke", "blue")
      .attr("stroke-width", 0.5)
      .attr("vector-effect", "non-scaling-stroke");
  };

  useEffect(() => {
    draw();
  }, [sliderValues]);

  return (
    <div>
      <h1>2D SVG</h1>
      <input
        type="range"
        min={0}
        max={200}
        value={sliderValues.y}
        onChange={(e) => handleSliderChange("y", e.target.value)}
        style={{ width: 200, margin: "20px 0" }}
      />
      <p>Y Value: {sliderValues.y}</p>
      <input
        type="range"
        min={0}
        max={100}
        value={sliderValues.x}
        onChange={(e) => handleSliderChange("x", e.target.value)}
        style={{ width: 200, margin: "20px 0" }}
      />
      <p>X Value: {sliderValues.x}</p>
      <svg
        ref={svgRef}
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
        width={500}
        style={{ margin: "auto" }}
      ></svg>
    </div>
  );
};

export default Index;
