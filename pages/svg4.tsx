import React from "react";

const Index = () => {
  return (
    <div>
      <h1>2D SVG</h1>
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
          <line x1="10" y1="10" x2="10" y2="110" />
          <line x1="10" y1="110" x2="110" y2="110" />
          <line x1="110" y1="10" x2="110" y2="110" />
          <line x1="10" y1="10" x2="110" y2="10" />
        </g>
        <path d="M 10,110 A 50,10 0 0,1 110,110" fill="none" stroke="green" strokeWidth={0.5} />
        <path d="M 10,110 A 50,10 0 0,0 110,110" fill="none" stroke="blue" strokeWidth={0.5} />
        
      </svg>
    </div>
  );
};

export default Index;
