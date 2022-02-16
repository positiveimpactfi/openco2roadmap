import { Group } from "@visx/group";
import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend";
import { BrowserUsage as Browsers } from "@visx/mock-data/lib/mocks/browserUsage";
import { scaleOrdinal } from "@visx/scale";
import Pie, { PieArcDatum, ProvidedProps } from "@visx/shape/lib/shapes/Pie";
import React, { useState } from "react";
import { animated, interpolate, useTransition } from "react-spring";

// data and types

interface DataEntry {
  label: string;
  usage: number;
}

const categories = [
  "Hallinto",
  "Logistiikka",
  "Toimitilat ja kiinteistöt",
  "Hankinnat",
];
const data: DataEntry[] = categories.map((name) => ({
  label: name,
  usage: name.length,
}));

// accessor functions
const usage = (d: DataEntry) => d.usage;

// color scales
const colorScale = scaleOrdinal({
  domain: categories,
  range: [
    "rgb(255,240,150)",
    "rgb(99,151,138	)",
    "rgb(209, 220,182)",
    "#fcd8e3",
    "#aea8c7",
    "#9bb1ca",
  ],
});

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 50 };

export type PieProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  animate?: boolean;
};

export default function PieChart({
  width,
  height,
  margin = defaultMargin,
  animate = true,
}: PieProps) {
  const [selectedBrowser, setSelectedBrowser] = useState<string | null>(null);

  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 40;

  return (
    <div>
      <h1 className="py-4 text-xl font-semibold">Päästöjen jakauma v.2020</h1>
      <div className="flex max-w-lg items-center rounded-md bg-white">
        <svg height={height}>
          <Group top={centerY + margin.top} left={120}>
            <Pie
              data={
                selectedBrowser
                  ? data.filter(({ label }) => label === selectedBrowser)
                  : data
              }
              pieValue={usage}
              outerRadius={radius}
              innerRadius={radius - donutThickness}
              cornerRadius={3}
              padAngle={0.005}
            >
              {(pie) => (
                <AnimatedPie<DataEntry>
                  {...pie}
                  animate={animate}
                  getKey={(arc) => arc.data.label}
                  onClickDatum={({ data: { label } }) =>
                    animate &&
                    setSelectedBrowser(
                      selectedBrowser && selectedBrowser === label
                        ? null
                        : label
                    )
                  }
                  getColor={(arc) => colorScale(arc.data.label)}
                />
              )}
            </Pie>
          </Group>
          {animate && (
            <>
              <text
                textAnchor="end"
                x={width / 2 - 80}
                y={height / 2}
                fill="black"
                fontSize={20}
                fontWeight={800}
                pointerEvents="none"
              >
                283t
              </text>
              <text
                textAnchor="end"
                x={width / 2 - 70}
                y={height / 2 + 20}
                fill="black"
                fontSize={16}
                fontWeight={400}
                pointerEvents="none"
              >
                kg CO2e
              </text>
            </>
          )}
        </svg>
        <MyLegend />
      </div>
    </div>
  );
}

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
  delay?: number;
};

function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });
  return transitions((props, arc, { key }) => {
    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={interpolate(
            [props.startAngle, props.endAngle],
            (startAngle, endAngle) =>
              path({
                ...arc,
                startAngle,
                endAngle,
              })
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
        />
      </g>
    );
  });
}

const MyLegend = () => {
  const legendGlyphSize = 15;
  return (
    <LegendOrdinal scale={colorScale}>
      {(labels) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {labels.map((label, i) => (
            <LegendItem
              key={`legend-quantile-${i}`}
              margin="0 5px"
              onClick={(e) => {
                if (e) alert(`clicked: ${JSON.stringify(label)}`);
              }}
            >
              <svg width={legendGlyphSize} height={legendGlyphSize}>
                <rect
                  fill={label.value}
                  width={legendGlyphSize}
                  height={legendGlyphSize}
                />
              </svg>
              <LegendLabel align="left" margin="0 0 0 4px">
                {label.text}
              </LegendLabel>
            </LegendItem>
          ))}
        </div>
      )}
    </LegendOrdinal>
  );
};
