import { AxisBottom, AxisLeft } from "@visx/axis";
import { localPoint } from "@visx/event";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { LegendOrdinal } from "@visx/legend";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarStack } from "@visx/shape";
import { SeriesPoint } from "@visx/shape/lib/types";
import { defaultStyles, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import React from "react";
import { MonthlyDataEntry } from "./ChartGroup";
import { colors } from "./colors";

type CategoryName =
  | "Toimitilat ja kiinteistöt"
  | "Hankinnat"
  | "Logistiikka"
  | "Hallinto";

type MonthData = {
  [key in CategoryName]: number;
} & { date: string; month?: string };

type TooltipData = {
  bar: SeriesPoint<MonthData>;
  key: CategoryName;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};

export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  year: number;
  data: MonthlyDataEntry[];
};

const background = "white";
const defaultMargin = { top: 40, right: 0, bottom: 40, left: 80 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

let tooltipTimeout: number;

// accessors
const getDate = (d: MonthData) => d.date;

export default function StackedBar({
  width,
  height,
  events = false,
  margin = defaultMargin,
  year,
  data: filteredData,
}: BarStackProps) {
  const parsedData = filteredData?.reduce((acc, current) => {
    let skeleton = {
      "Toimitilat ja kiinteistöt": 0,
      Hallinto: 0,
      Logistiikka: 0,
      Hankinnat: 0,
      date: "",
      month: "",
    };
    let skeletons = [];
    const addedMonths = acc.map((a) => a.month);
    for (let month of Object.keys(current.months)) {
      if (addedMonths.includes(month)) {
        acc.find((a) => a.month === month)[current.name] =
          current.months[month];
      } else {
        const skeletonCopy = { ...skeleton };
        skeletonCopy[current.name] = current.months[month];
        let paddedMonth = month.toString().padStart(2, "0");
        skeletonCopy.date = `${year}-${paddedMonth}-01`;
        skeletonCopy.month = month;
        skeletons.push(skeletonCopy);
      }
    }
    return acc.concat(skeletons);
  }, [] as MonthData[]);
  const data = parsedData?.sort((a, b) => Number(a.month) - Number(b.month));

  const keys = [
    "Toimitilat ja kiinteistöt",
    "Hankinnat",
    "Logistiikka",
    "Hallinto",
  ] as CategoryName[];

  console.log("data", data);
  const emissionTotals = data?.reduce((allTotals, currentDate) => {
    const totalEmissions = keys.reduce((monthlyTotal, k) => {
      monthlyTotal += Number(currentDate[k]);
      return monthlyTotal;
    }, 0);
    allTotals.push(totalEmissions);
    return allTotals;
  }, [] as number[]);
  console.log("emission totals", emissionTotals);
  const maxEmission = emissionTotals ? Math.max(...emissionTotals) : 0;

  const formatDate = (date: string) =>
    format(new Date(date), "LLL", { locale: fi });

  // scales
  const dateScale = scaleBand<string>({
    domain: data?.map(getDate),
    padding: 0.2,
  });
  const emissionScale = scaleLinear<number>({
    domain: [0, maxEmission],
  });
  const colorScale = scaleOrdinal<CategoryName, string>({
    domain: keys,
    range: colors,
  });

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });

  if (width < 10) return null;
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  dateScale.rangeRound([0, xMax]);
  emissionScale.range([yMax, 0]);

  return width < 10 ? null : (
    <div>
      <h1 className="pb-4 text-xl font-semibold">Päästöjen kehitys v.{year}</h1>
      <div className="relative">
        <svg ref={containerRef} width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={background}
            rx={14}
          />
          <Group left={margin.left} top={margin.top}>
            <GridRows
              scale={emissionScale}
              numTicks={5}
              width={xMax}
              height={yMax}
              stroke="black"
              strokeDasharray="4"
              strokeOpacity={0.1}
            />
            <AxisLeft
              hideTicks={true}
              numTicks={5}
              label="Päästöt, kg CO2e"
              labelOffset={45}
              labelProps={{
                fill: "black",
                textAnchor: "middle",
                fontSize: 14,
              }}
              scale={emissionScale}
              stroke={"black"}
              tickStroke={"black"}
              tickLabelProps={() => ({
                fill: "black",
                fontSize: 11,
                textAnchor: "end",
              })}
            />
            <AxisBottom
              hideTicks={true}
              hideAxisLine={true}
              top={yMax}
              scale={dateScale}
              tickFormat={formatDate}
              stroke={"black"}
              tickStroke={"black"}
              tickLabelProps={() => ({
                fill: "black",
                fontSize: 11,
                textAnchor: "middle",
              })}
            />

            <BarStack<MonthData, CategoryName>
              data={data}
              keys={keys}
              x={getDate}
              xScale={dateScale}
              yScale={emissionScale}
              color={colorScale}
            >
              {(barStacks) =>
                barStacks.map((barStack) =>
                  barStack.bars.map((bar) => (
                    <rect
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      height={bar.height}
                      width={bar.width}
                      fill={bar.color}
                      onClick={() => {
                        if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                      }}
                      onMouseLeave={() => {
                        tooltipTimeout = window.setTimeout(() => {
                          hideTooltip();
                        }, 300);
                      }}
                      onMouseMove={(event) => {
                        if (tooltipTimeout) clearTimeout(tooltipTimeout);
                        // TooltipInPortal expects coordinates to be relative to containerRef
                        // localPoint returns coordinates relative to the nearest SVG, which
                        // is what containerRef is set to in this example.
                        const eventSvgCoords = localPoint(event);
                        const left = bar.x + bar.width / 2;
                        showTooltip({
                          tooltipData: bar,
                          tooltipTop: eventSvgCoords?.y,
                          tooltipLeft: left,
                        });
                      }}
                    />
                  ))
                )
              }
            </BarStack>
          </Group>
        </svg>
        <div
          className="absolute flex w-full justify-center "
          style={{
            top: margin.top / 2 - 10,
            fontSize: "14px",
          }}
        >
          <LegendOrdinal
            scale={colorScale}
            direction="row"
            labelMargin="0 15px 0 0"
          />
        </div>

        {tooltipOpen && tooltipData && (
          <TooltipInPortal
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            <div style={{ color: colorScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>
              {tooltipData.bar.data[tooltipData.key].toFixed(0)} kg CO2e
            </div>
            <div>
              <small>{formatDate(getDate(tooltipData.bar.data))}</small>
            </div>
          </TooltipInPortal>
        )}
      </div>
    </div>
  );
}
