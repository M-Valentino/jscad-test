import React, { useEffect, useState, FC } from "react";
import makerjs from "makerjs";

const Home: FC = () => {
  const [svgData, setSVGData] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);

  const draw = (width: number, height: number) => {
    const pathArray = [
      {
        type: "line",
        origin: [0, 0],
        end: [0, height],
      },
      {
        type: "line",
        origin: [0, height],
        end: [width, height],
      },
      {
        type: "line",
        origin: [width, height],
        end: [width, 0],
      },
      {
        type: "line",
        origin: [0, 0],
        end: [width, 0],
      },
    ];

    const svg = makerjs.exporter.toSVG(pathArray, {
      // scale: 1.2,
      strokeWidth: "0.5mm",
    });
    setSVGData(svg);
  };

  useEffect(() => {
    draw(width, height);
  }, [width, height]);

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(event.target.value));
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value));
  };

  return (
    <div>
      <div>
        <label>Width: </label>
        <input
          type="range"
          min="10"
          max="200"
          value={width}
          onChange={handleWidthChange}
        />
      </div>
      <div>
        <label>Height: </label>
        <input
          type="range"
          min="10"
          max="200"
          value={height}
          onChange={handleHeightChange}
        />
      </div>
      {svgData && (
        <div
          style={{ margin: 30 }}
          dangerouslySetInnerHTML={{ __html: svgData }}
        />
      )}
    </div>
  );
};

export default Home;
