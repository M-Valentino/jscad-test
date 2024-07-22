import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Index = () => {
  const [sliderValues, setSliderValues] = useState({ x: 100, y: 100 });
  const [showMesh, setShowMesh] = useState(true);
  const svgRef = useRef(null);

  const handleSliderChange = (axis, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [axis]: parseInt(value),
    }));
  };

  const draw = () => {
    const { x, y } = sliderValues;
    const offset = 30;
    const xMidpoint = x / 2;
    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll("*").remove();

    const appendLine = (line, fill) => {
      svg
        .append("path")
        .attr("d", line)
        .attr("fill", fill === true ? "blue" : "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 0.5)
        .attr("vector-effect", "non-scaling-stroke");
    };

    const dimensionLine = (p1, p2, dimHeight) => {
      const dimensionOffset = 5;

      // horizontal lines
      appendLine(
        d3.line()([
          [p1[0] + dimensionOffset, p1[1]],
          [p1[0] + dimHeight, p1[1]],
        ])
      );

      appendLine(
        d3.line()([
          [p2[0] + dimensionOffset, p2[1]],
          [p2[0] + dimHeight, p2[1]],
        ])
      );

      // vertical bar
      appendLine(
        d3.line()([
          [p1[0] + (dimHeight - 10), p1[1]],
          [p2[0] + (dimHeight - 10), p2[1]],
        ])
      );

      // top arrow lines
      appendLine(
        d3.line()([
          [p1[0] + (dimHeight - 10), p1[1]],
          [p1[0] + (dimHeight - 10) + 1, p1[1] + 4],
          [p1[0] + (dimHeight - 10), p1[1]],
          [p1[0] + (dimHeight - 10) - 1, p1[1] + 4],
          [p1[0] + (dimHeight - 10) + 1, p1[1] + 4],
        ]),
        true
      );

      // bottom arrow lines
      appendLine(
        d3.line()([
          [p2[0] + (dimHeight - 10), p2[1]],
          [p2[0] + (dimHeight - 10) + 1, p2[1] - 4],
          [p2[0] + (dimHeight - 10), p2[1]],
          [p2[0] + (dimHeight - 10) - 1, p2[1] - 4],
          [p2[0] + (dimHeight - 10) + 1, p2[1] - 4],
        ]),
        true
      );
    };

    dimensionLine([offset + x, offset], [offset + x, offset + y], 30);

    const drawTopValve = () => {
      const topValveBaseLeft = d3.line()([
        [xMidpoint + offset - 8, 10],
        [xMidpoint + offset - 8, offset],
      ]);
      appendLine(topValveBaseLeft);

      const topValveBaseRight = d3.line()([
        [xMidpoint + offset + 8, 10],
        [xMidpoint + offset + 8, offset],
      ]);
      appendLine(topValveBaseRight);

      const topValveBaseTop = d3.line()([
        [xMidpoint + offset - 8, 10],
        [xMidpoint + offset + 8, 10],
      ]);
      appendLine(topValveBaseTop);

      // top of top valve
      svg
        .append("rect")
        .attr("x", xMidpoint + offset - 10)
        .attr("y", 8)
        .attr("width", xMidpoint + offset + 10 - (xMidpoint + offset - 10))
        .attr("height", 2)
        .attr("fill", "#000");
    };

    const drawBottomValve = () => {
      const topValveBaseLeft = d3.line()([
        [xMidpoint + offset - 8, y + offset],
        [xMidpoint + offset - 8, 20 + y + offset],
      ]);
      appendLine(topValveBaseLeft);

      const topValveBaseRight = d3.line()([
        [xMidpoint + offset + 8, y + offset],
        [xMidpoint + offset + 8, 20 + y + offset],
      ]);
      appendLine(topValveBaseRight);

      const topValveBaseTop = d3.line()([
        [xMidpoint + offset - 8, 20 + y + offset],
        [xMidpoint + offset + 8, 20 + y + offset],
      ]);
      appendLine(topValveBaseTop);

      // top of top valve
      svg
        .append("rect")
        .attr("x", xMidpoint + offset - 10)
        .attr("y", y + offset + 20)
        .attr("width", xMidpoint + offset + 10 - (xMidpoint + offset - 10))
        .attr("height", 2)
        .attr("fill", "#000");
    };

    drawTopValve();
    drawBottomValve();

    // contains sides and arcs of cylinder
    const pathData = `
      M ${offset},${offset} 
      L ${offset},${offset + y}
      M ${offset + x},${offset} 
      L ${offset + x},${offset + y}
      M ${offset},${offset + y}
      A ${xMidpoint},${offset / 2} 0 0,0 ${offset + x},${offset + y}
      M ${offset},${offset}
      A ${xMidpoint},${offset / 2} 0 0,1 ${offset + x},${offset}
    `;

    svg
      .append("path")
      .attr("d", pathData)
      .attr("fill", "white")
      .attr("stroke", "blue")
      .attr("stroke-width", 0.5)
      .attr("vector-effect", "non-scaling-stroke");

    if (showMesh) {
      svg
        .append("defs")
        .append("pattern")
        .attr("id", "weave-pattern")
        .attr("width", 5)
        .attr("height", 5)
        .attr("patternUnits", "userSpaceOnUse")
        .append("path")
        .attr("d", "M0 0 L5 5 M5 0 L0 5")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5);

      // Create the rectangle and apply the pattern as fill
      svg
        .append("rect")
        .attr("x", offset)
        .attr("y", 40)
        .attr("width", x)
        .attr("height", 15)
        .attr("fill", "url(#weave-pattern)");
    }
  };

  useEffect(() => {
    draw();
  }, [sliderValues, showMesh]);

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

      <br/>
      <br/>
      <button onClick={() => setShowMesh(!showMesh)} style={{border: "1px solid blue"}}>Togle Mesh</button>

      <svg
        ref={svgRef}
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
        width={500}
        style={{ position: "absolute", left: 300, top: 50, backgroundColor: "#fff"}}
      ></svg>
    </div>
  );
};

export default Index;
