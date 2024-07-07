import React from "react";
import dynamic from "next/dynamic";
import { OpenJSCADProps } from "openjscad-react";
import { FormGroup } from "../src/FormGroup";

// Dynamic import
const OpenJSCAD: React.ComponentType<OpenJSCADProps> = dynamic(
  () => import("openjscad-react").then((mod) => mod.OpenJSCAD),
  {
    ssr: false,
  }
);

// // // //

function getSign(props: { name?: string; height?: number; padding?: number }) {
  let { name = "Hello, OpenJSCAD!" } = props;
  const { height = 4, padding = 2 } = props;

  // Removes all double quotes and back-slashes (prevents issues when interpolating below)
  name = name.replace(/[\"/s]/gi, "").replace(/[/\/s]/gi, "");

  // Renders sign JSCAD script
  const signJscad = `
function main (param) {
  var o = []; // our stack of objects
  var l = []; // our stack of line segments (when rendering vector text)
  var p = []; // our stack of extruded line segments

  var name = "${name}";
  var thickness = ${String(height)};
  
  // -- render name & extrude
  l = vector_text(0, 0, name);
  l.forEach(function (s) {
      p.push(rectangular_extrude(s, {w: 4, h: 4}));
  });
  o.push(union(p).setColor([0.3, 0.3, 0.3]).scale([1 / 3, 1 / 3, 1 / 3]).center([true, true, false]).translate([0, 0, thickness]));
  
  var b = o[0].getBounds();
  var m = ${padding};
  var w = b[1].x - b[0].x + m * 2;
  var h = b[1].y - b[0].y + m * 2;
  o.push(cube({size: [w, h, thickness], round: true, radius: 0.5}).translate([b[0].x - m, b[0].y - m, 0]).setColor([0.8, 0.8, 0.8]));
  return union(o);
  }
`;

  return signJscad;
}

// // // //

const Index = () => {
  if (typeof window == "undefined" || typeof document == "undefined") {
    return null;
  }


  return (
    <OpenJSCAD
      outputFileExport="stla"
      viewerOptions={{
        camera: {
          angle: { x: -30, y: 0, z: 0 },
        },
      }}
      jscadScript={getSign({
        name: "name",
        height: 2,
        padding: 3,
      })}
      loadingPlaceholder={() => {
        return (
          <div
            className="card flex justify-center items-center"
            style={{ minHeight: "32rem" }}
          >
            <p>Resizing...</p>
          </div>
        );
      }}
    >
      {(childProps) => {
        return (
          <main>
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full">
              <div className="col-span-2 lg:pl-2 sm:pl-0 mt-3 lg:mt-0 rounded-xl">
                {/* Example using refs directly */}
                <div
                  ref={childProps.refs.viewerContext}
                  className="rounded-xl bg-white overflow-hidden"
                >
                  <div ref={childProps.refs.viewerDiv} />
                </div>

                {/* Don't forget parametersTable! */}
                <table ref={childProps.refs.parametersTable} />

                <canvas
                  style={{
                    width: "100%",
                    height: "480px",
                  }}
                  ref={childProps.refs.viewerCanvas}
                />
              </div>
            </div>
          </main>
        );
      }}
    </OpenJSCAD>
  );
};

export default Index;
