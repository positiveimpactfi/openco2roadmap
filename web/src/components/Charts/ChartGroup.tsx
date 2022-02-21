import { useState } from "react";
import PieChart, { YearlyDataEntry } from "./Pie";
import StackedBar from "./StackedBar";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

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

const ChartGroup = ({ yearlyData, years, monthlyData }: ChartGroupProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
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
        <div className="flex flex-wrap items-center  gap-14 text-left">
          <div className="h-[250px] min-w-[30%]">
            <ParentSize>
              {({ width, height }) => (
                <PieChart
                  width={width}
                  height={height}
                  data={yearlyData}
                  year={year}
                />
              )}
            </ParentSize>
          </div>
          <div className="h-[250px] min-w-[60%]">
            <ParentSize>
              {({ width, height }) => (
                <StackedBar
                  width={width}
                  height={height}
                  data={filteredMonthlyData}
                  year={year}
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
