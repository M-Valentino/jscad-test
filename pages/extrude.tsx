import React from "react";
import dynamic from "next/dynamic";
import { OpenJSCADProps } from "openjscad-react";

// Dynamic import
const OpenJSCAD: React.ComponentType<OpenJSCADProps> = dynamic(
  () => import("openjscad-react").then((mod) => mod.OpenJSCAD),
  {
    ssr: false,
  }
);

function getSign(props: { name?: string; height?: number; padding?: number }) {
  let { name = "Hello, OpenJSCAD!" } = props;

  // Removes all double quotes and back-slashes (prevents issues when interpolating below)
  name = name.replace(/[\"/s]/gi, "").replace(/[/\/s]/gi, "");

  // Renders sign JSCAD script
  const signJscad = `
  let res = 90;

  function main() {
    return union(
      polygon({ points: [[-1, -1], [3, -1], [3.5, 2], [2, 1], [1, 2], [0, 1], [-1, 2]] }).extrude({ offset: [0, 0, 5] })
    ).translate([0, 0, 1.5]);
  }
`;


  return signJscad;
}

const Index = () => {
  if (typeof window == "undefined" || typeof document == "undefined") {
    return null;
  }

  return (
    <OpenJSCAD
      outputFileExport="stla"
      viewerOptions={{
        camera: {
          angle: { x: 0, y: 0, z: 0 },
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
