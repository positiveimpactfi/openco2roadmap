import { useState } from "react";
import PieChart, { YearlyDataEntry } from "./Pie";
import StackedBar from "./StackedBar";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import Legend from "./Legend";
import { scaleOrdinal } from "@visx/scale";
import { colors } from "./colors";

export interface MonthlyDataEntry {
  name: string;
  id: string;
  year: number;
  months: { [key: number]: number };
}

interface ChartGroupProps {
  yearlyData: YearlyDataEntry[];
  monthlyData: MonthlyDataEntry[];
  years: number[];
}

export type CategoryName =
  | "Toimitilat ja kiinteistöt"
  | "Hankinnat"
  | "Logistiikka"
  | "Hallinto";

export const keys = [
  "Toimitilat ja kiinteistöt",
  "Hankinnat",
  "Logistiikka",
  "Hallinto",
] as CategoryName[];

export const colorScale = scaleOrdinal({
  domain: keys as string[],
  range: colors,
});

const ChartGroup = ({ yearlyData, years, monthlyData }: ChartGroupProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const filteredMonthlyData = monthlyData?.filter((m) => m.year === year);

  return (
    <div className="my-2 flex flex-col space-y-2">
      <select
        className="w-fit"
        name="yearSelect"
        value={year}
        onChange={(e) => setYear(parseInt(e.currentTarget.value))}
      >
        {years.map((y) => (
          <option value={y} key={y}>
            {y}
          </option>
        ))}
      </select>

      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-14 text-left">
          <div className="h-[250px] w-full min-w-[200px] max-w-[300px]">
            <ParentSize>
              {({ width, height }) => (
                <PieChart
                  width={width}
                  height={height}
                  data={yearlyData}
                  year={year}
                  selectedComponent={selectedComponent}
                  setSelectedComponent={setSelectedComponent}
                />
              )}
            </ParentSize>
          </div>
          <div className="h-[250px]">
            <Legend
              colorScale={colorScale}
              selectedComponent={selectedComponent}
              setSelectedComponent={setSelectedComponent}
            />
          </div>
          <div className="h-[250px] w-full min-w-[400px] max-w-[800px]">
            <ParentSize>
              {({ width, height }) => (
                <StackedBar
                  width={width}
                  height={height}
                  data={filteredMonthlyData}
                  year={year}
                  selectedComponent={selectedComponent}
                />
              )}
            </ParentSize>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartGroup;
