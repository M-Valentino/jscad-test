import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import * as d3 from "d3";

const Index = () => {
  const [sliderValues, setSliderValues] = useState({ x: 100, y: 100 });
  const [showMesh, setShowMesh] = useState(true);
  const svgRef = useRef(null);
  const svgHeight = 300; // Height of the SVG container

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
    const yMidpoint = y / 2;
    const arcRadius = 15;
    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll("*").remove();

    const appendLine = (line, fill) => {
      svg
        .append("path")
        .attr("d", line)
        .attr("fill", fill === true ? "#000" : "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .attr("vector-effect", "non-scaling-stroke");
    };

    const dimensionLine = (p1, p2, dimHeight, topLeaderLineOffset) => {
      const dimensionOffset = 5;

      // horizontal lines
      appendLine(
        d3.line()([
          [p1[0] + dimensionOffset + topLeaderLineOffset, p1[1]],
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

      svg
        .append("text")
        .attr("x", dimHeight + offset + x / 1.6)
        .attr("y", svgHeight - offset - yMidpoint)
        .attr("class", "text")
        .text("H");
    };

    const dimensionDiameterLine = (p1, p2, dimHeight) => {
      const dimensionOffset = 5;

      // vertical lines
      appendLine(
        d3.line()([
          [p1[0], p1[1] - dimensionOffset],
          [p1[0], p1[1] - dimHeight],
        ])
      );

      appendLine(
        d3.line()([
          [p2[0], p2[1] - dimensionOffset],
          [p2[0], p2[1] - dimHeight],
        ])
      );

      // horizontal bar
      appendLine(
        d3.line()([
          [p1[0], p1[1] - (dimHeight - 10)],
          [p2[0], p2[1] - (dimHeight - 10)],
        ])
      );

      // left arrow lines
      appendLine(
        d3.line()([
          [p1[0], p1[1] - (dimHeight - 10)],
          [p1[0] + 4, p1[1] - (dimHeight - 10) + 1],
          [p1[0], p1[1] - (dimHeight - 10)],
          [p1[0] + 4, p1[1] - (dimHeight - 10) - 1],
          [p1[0] + 4, p1[1] - (dimHeight - 10) + 1],
        ]),
        true
      );

      // right arrow lines
      appendLine(
        d3.line()([
          [p2[0], p2[1] - (dimHeight - 10)],
          [p2[0] - 4, p2[1] - (dimHeight - 10) + 1],
          [p2[0], p2[1] - (dimHeight - 10)],
          [p2[0] - 4, p2[1] - (dimHeight - 10) - 1],
          [p2[0] - 4, p2[1] - (dimHeight - 10) + 1],
        ]),
        true
      );

      svg
        .append("text")
        .attr("x", (p1[0] + p2[0]) / 2 - 5)
        .attr("y", p1[1] + offset - 27 - dimHeight )
        .attr("class", "text")
        .text("D");
    };

    dimensionLine(
      [offset + xMidpoint + 10, svgHeight - offset - y - arcRadius],
      [offset + xMidpoint + 10, svgHeight - offset + arcRadius],
      x - x / 3 + 10,
      x / 2 - 10
    );

    dimensionDiameterLine(
      [offset, svgHeight - offset - y],
      [offset + x, svgHeight - offset - y],
      40
    );

    const drawBottomValve = () => {
      const bottValveBaseLeft = d3.line()([
        [xMidpoint + offset - 8, svgHeight - 10],
        [xMidpoint + offset - 8, svgHeight - offset],
      ]);
      appendLine(bottValveBaseLeft);

      const bottValveBaseRight = d3.line()([
        [xMidpoint + offset + 8, svgHeight - 10],
        [xMidpoint + offset + 8, svgHeight - offset],
      ]);
      appendLine(bottValveBaseRight);

      const bottValveBaseTop = d3.line()([
        [xMidpoint + offset - 8, svgHeight - 10],
        [xMidpoint + offset + 8, svgHeight - 10],
      ]);
      appendLine(bottValveBaseTop);

      svg
        .append("rect")
        .attr("x", xMidpoint + offset - 10)
        .attr("y", svgHeight - 10)
        .attr("width", 20)
        .attr("height", 2)
        .attr("fill", "#000");
    };

    const drawTopValve = () => {
      const topValveBaseLeft = d3.line()([
        [xMidpoint + offset - 8, svgHeight - offset - y],
        [xMidpoint + offset - 8, svgHeight - offset - y - 20],
      ]);
      appendLine(topValveBaseLeft);

      const topValveBaseRight = d3.line()([
        [xMidpoint + offset + 8, svgHeight - offset - y],
        [xMidpoint + offset + 8, svgHeight - offset - y - 20],
      ]);
      appendLine(topValveBaseRight);

      const topValveBaseTop = d3.line()([
        [xMidpoint + offset - 8, svgHeight - offset - y - 20],
        [xMidpoint + offset + 8, svgHeight - offset - y - 20],
      ]);
      appendLine(topValveBaseTop);

      svg
        .append("rect")
        .attr("x", xMidpoint + offset - 10)
        .attr("y", svgHeight - offset - y - 22)
        .attr("width", 20)
        .attr("height", 2)
        .attr("fill", "#000");
    };

    const drawLeftValve = () => {
      const topValveBaseLeft = d3.line()([
        [offset, svgHeight - yMidpoint - offset - 8],
        [offset - 8, svgHeight - yMidpoint - offset - 8],
      ]);
      appendLine(topValveBaseLeft);

      const topValveBaseRight = d3.line()([
        [offset, svgHeight - yMidpoint - offset + 8],
        [offset - 8, svgHeight - yMidpoint - offset + 8],
      ]);
      appendLine(topValveBaseRight);

      const topValveBaseTop = d3.line()([
        [offset - 8, svgHeight - yMidpoint - offset - 8],
        [offset - 8, svgHeight - yMidpoint - offset + 8],
      ]);
      appendLine(topValveBaseTop);

      svg
        .append("rect")
        .attr("x", offset - 10)
        .attr("y", svgHeight - offset - yMidpoint - 10)
        .attr("width", 2)
        .attr("height", 20)
        .attr("fill", "#000");
    };

    drawTopValve();
    drawBottomValve();
    drawLeftValve();

    // contains sides and arcs of cylinder
    const pathData = `
      M ${offset},${svgHeight - offset - y} 
      L ${offset},${svgHeight - offset}
      M ${offset + x},${svgHeight - offset - y} 
      L ${offset + x},${svgHeight - offset}
      M ${offset},${svgHeight - offset}
      A ${xMidpoint},${arcRadius} 0 0,0 ${offset + x},${svgHeight - offset}
      M ${offset},${svgHeight - offset - y}
      A ${xMidpoint},${arcRadius} 0 0,1 ${offset + x},${svgHeight - offset - y}
    `;

    svg
      .append("path")
      .attr("d", pathData)
      .attr("fill", "white")
      .attr("stroke", "#000")
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
        .attr("y", svgHeight - offset - y + 20)
        .attr("width", x)
        .attr("height", 15)
        .attr("fill", "url(#weave-pattern)");
    }
  };

  useEffect(() => {
    draw();
  }, [sliderValues, showMesh]);

  return (
    <>
    <Head>
      <title>Demo</title>
    </Head>
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

      <br />
      <br />
      <button
        onClick={() => setShowMesh(!showMesh)}
        style={{ border: "1px solid #000" }}
      >
        Toggle Mesh
      </button>

      <svg
        ref={svgRef}
        viewBox={`0 0 200 ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        width={500}
        style={{
          position: "absolute",
          left: 300,
          top: 50,
          backgroundColor: "#fff",
        }}
      >

      </svg>
    </div>
    </>
  );
};

export default Index;
