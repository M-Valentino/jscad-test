import React, { useEffect, useState } from "react";
import { primitives, transforms } from "@jscad/modeling";
import { rotate } from "@jscad/modeling/src/operations/transforms";
import { translate } from "@jscad/modeling/src/operations/transforms";

const svgSerializer = require("@jscad/svg-serializer");

const Index = () => {
  const [svgData, setSVGData] = useState<string>("");

  const lineWidth = 0.05;

  const drawLine = (p1: [number, number], p2: [number, number]) => {
    const distX = p2[0] - p1[0];
    const distY = p2[1] - p1[1];
    const angle = Math.atan2(distY, distX);
    const length = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

    // Create a rectangle with the correct length
    const rectangle = primitives.rectangle({ size: [length, lineWidth] });

    // Translate the rectangle so that its center is at the midpoint of p1 and p2
    const midpoint = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    const translated = translate([midpoint[0], midpoint[1], 0], rectangle);

    // Rotate the rectangle to match the angle between p1 and p2
    const line = rotate([0, 0, angle], translated);

    return line;
};


  useEffect(() => {
    let geometry = [];

    let rectangle = primitives.rectangle();
    rectangle = transforms.translate([5, 0, 0], rectangle);

    geometry.push(drawLine([0, 0], [0, 1]));
    geometry.push(drawLine([0, 1], [1, 1]));
    geometry.push(drawLine([1, 0], [1, 1]));

    const rawData = svgSerializer.serialize({ unit: "cm" }, geometry);
    setSVGData(rawData[0]);
  }, []);

  return (
    <div>
      <h1>2D SVG</h1>
      <div dangerouslySetInnerHTML={{ __html: svgData }} />
    </div>
  );
};

export default Index;
