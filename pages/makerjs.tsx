import React, { useEffect, useState, FC } from "react";
import makerjs from "makerjs";

const Home: FC = () => {
  const [svgData, setSVGData] = useState<string | null>(null);

  const draw = () => {
    const line = {
      type: "line",
      origin: [0, 0],
      end: [50, 50],
    };

    const circle = {
      type: "circle",
      origin: [0, 0],
      radius: 50,
    };

    const pathArray = [line, circle];

    const svg = makerjs.exporter.toSVG(pathArray);
    setSVGData(svg);
  };

  useEffect(() => {
    draw();
  }, []);

  return (
    <div>
      {svgData && <div dangerouslySetInnerHTML={{ __html: svgData }} />}
    </div>
  );
};

export default Home;
