import React, { useEffect, useState } from "react";
import { primitives } from "@jscad/modeling";
const svgSerializer = require("@jscad/svg-serializer");

const Index = () => {
  const [svgData, setSVGData] = useState<string>("");

  useEffect(() => {
    const geometry = primitives.circle();
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
