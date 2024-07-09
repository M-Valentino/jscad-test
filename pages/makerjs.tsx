import React, { useEffect, useState, FC } from "react";
import makerjs from "makerjs";

const Home: FC = () => {
  const [svgData, setSVGData] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);

  const draw = () => {
    let model: makerjs.IModel = {
      paths: {
        line1: new makerjs.paths.Line([0, 0], [0, height]),
        line2: new makerjs.paths.Line([0, height], [width, height]),
        line3: new makerjs.paths.Line([width, height], [width, 0]),
        line4: new makerjs.paths.Line([width, 0], [0, 0]),
      },
      models: {
        ellipse1: new makerjs.models.Ellipse([width /2, 0], width / 2,  20),
        
      },
    };


    const svg = makerjs.exporter.toSVG(model, {
      // scale: 2,
      strokeWidth: "0.5mm",
    });
    setSVGData(svg);
  };

  useEffect(() => {
    draw();
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
