import React, { useEffect, useState } from "react";
import makerjs from "makerjs";

const Home = () => {
  const [svgData, setSVGData] = useState(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const offset = 50;

  const dimensionLine = (
    p1,
    p2,
    dimHeight
  ) => {
    const dimensionOffset = 5;
    return {
      paths: {
        a: new makerjs.paths.Line(
          [p1[0] + dimensionOffset, p1[1]],
          [p1[0] + dimHeight, p1[1]]
        ),
        b: new makerjs.paths.Line(
          [p2[0] + dimensionOffset, p2[1]],
          [p2[0] + dimHeight, p2[1]]
        ),
        // vertical bar
        c: new makerjs.paths.Line(
          [p1[0] + (dimHeight - 10), p1[1]],
          [p2[0] + (dimHeight - 10), p2[1]]
        ),

        // bottom arrow lines
        d1: new makerjs.paths.Line(
          [p1[0] + (dimHeight - 10), p1[1]],
          [p1[0] + (dimHeight - 10) + 2, p1[1] + 4]
        ),
        d2: new makerjs.paths.Line(
          [p1[0] + (dimHeight - 10), p1[1]],
          [p1[0] + (dimHeight - 10) - 2, p1[1] + 4]
        ),

        // top arrow lines
        e1: new makerjs.paths.Line(
          [p2[0] + (dimHeight - 10), p2[1]],
          [p2[0] + (dimHeight - 10) + 2, p2[1] - 4]
        ),
        e2: new makerjs.paths.Line(
          [p2[0] + (dimHeight - 10), p2[1]],
          [p2[0] + (dimHeight - 10) - 2, p2[1] - 4]
        ),
      },
    };
  };

  const draw = () => {
    const botArc = new makerjs.models.EllipticArc(180, 0, width / 2, 25);
    const botArcMoved = makerjs.model.moveRelative(botArc, [
      width / 2 + offset,
      offset,
    ]);
    let topArc = new makerjs.models.EllipticArc(0, 180, width / 2, 25);
    const topArcMoved = makerjs.model.moveRelative(topArc, [
      width / 2 + offset,
      height + offset,
    ]);

    let box = new makerjs.models.Rectangle(100, 50);
    box.origin = [0, 0];
    let invisibleBox = new makerjs.models.Rectangle(300, 300);

    const dimensionLine1 = dimensionLine(
      [offset + width, offset],
      [offset + width, offset + height],
      30
    );

    let model = {
      paths: {
        ...dimensionLine1.paths,
        line1: new makerjs.paths.Line(
          [offset, offset],
          [offset, height + offset]
        ),

        line3: new makerjs.paths.Line(
          [width + offset, height + offset],
          [width + offset, offset]
        ),
      },
      models: {
        botArc: botArcMoved,
        topArc: topArcMoved,

        // valve: makerjs.model.combine(botArcMoved, box, false, true, true, false),
        invisibleBox: invisibleBox,
      },
    };

    const svg = makerjs.exporter.toSVG(model, {
      // scale: 2,
      strokeWidth: "0.2mm",
    });
    setSVGData(svg);
  };

  useEffect(() => {
    draw();
  }, [width, height]);

  const handleWidthChange = (event) => {
    setWidth(Number(event.target.value));
  };

  const handleHeightChange = (event) => {
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
