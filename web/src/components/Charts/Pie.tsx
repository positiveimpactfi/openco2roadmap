import { Group } from "@visx/group";
import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend";
import Pie, { PieArcDatum, ProvidedProps } from "@visx/shape/lib/shapes/Pie";
import { Text } from "@visx/text";
import React, { useState } from "react";
import { animated, to, useTransition } from "react-spring";
import { numberToString } from "utils/numberToString";
import { colorScale } from "./ChartGroup";

// data and types

export interface YearlyDataEntry {
  name: string;
  id: string;
  years: { [key: number]: number };
}

const getValue = (d: YearlyDataEntry, year: number) => d.years[year];

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 50 };

export type PieProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  animate?: boolean;
  data: YearlyDataEntry[];
  year: number;
};

export default function PieChart({
  width,
  height,
  margin = defaultMargin,
  animate = true,
  data,
  year,
}: PieProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const total = (year: number) => {
    let filteredData = data;
    if (selectedComponent) {
      filteredData = data.filter((d) => d.name === selectedComponent);
    }
    return filteredData.reduce((acc, current) => {
      if (!current.years[year]) return acc;
      else return acc + current.years[year];
    }, 0);
  };

  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - 28 - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 40;

  return (
    <div>
      <h1 className="pb-4 text-xl font-semibold">Päästöjen jakauma v.{year}</h1>
      <div className="flex max-w-lg items-center rounded-md bg-white">
        <svg height={height}>
          <Group top={centerY + margin.top} left={120}>
            <Pie
              data={
                selectedComponent
                  ? data.filter(
                      ({ name: label }) => label === selectedComponent
                    )
                  : data
              }
              pieValue={(d) => getValue(d, year)}
              outerRadius={radius}
              innerRadius={radius - donutThickness}
              cornerRadius={3}
              padAngle={0.005}
            >
              {(pie) => (
                <AnimatedPie<YearlyDataEntry>
                  {...pie}
                  animate={animate}
                  getKey={(arc) => arc.data.name}
                  onClickDatum={({ data: { name: label } }) =>
                    animate &&
                    setSelectedComponent(
                      selectedComponent && selectedComponent === label
                        ? null
                        : label
                    )
                  }
                  getColor={(arc) => colorScale(arc.data.name)}
                />
              )}
            </Pie>
            <Text width={70} textAnchor="middle" fontSize={20} fontWeight={800}>
              {`${
                total(year) >= 1000
                  ? numberToString(total(year) / 1000, 1) + " t"
                  : numberToString(total(year), 0) + " kg"
              }`}
            </Text>
            <Text width={70} textAnchor="middle" y={25}>
              CO2e
            </Text>
          </Group>
        </svg>
        <MyLegend
          colorScale={colorScale}
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
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
          d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
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

const MyLegend = ({
  colorScale,
  selectedComponent,
  setSelectedComponent,
}: {
  colorScale: any;
  selectedComponent: string;
  setSelectedComponent: (c: string) => void;
}) => {
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
                if (e)
                  setSelectedComponent(
                    selectedComponent && selectedComponent === label.text
                      ? null
                      : label.text
                  );
              }}
            >
              <svg width={legendGlyphSize} height={legendGlyphSize}>
                <rect
                  fill={label.value}
                  width={legendGlyphSize}
                  height={legendGlyphSize}
                />
              </svg>
              <LegendLabel
                align="left"
                margin="0 0 0 4px"
                className="cursor-pointer"
              >
                {label.text}
              </LegendLabel>
            </LegendItem>
          ))}
        </div>
      )}
    </LegendOrdinal>
  );
};
