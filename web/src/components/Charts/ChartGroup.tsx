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
      <div className="h-[250px]">
        <ParentSize>
          {({ width, height }) => (
            <>
              <div className="flex space-x-10">
                <PieChart
                  width={(width * 3) / 10}
                  height={height}
                  data={yearlyData}
                  year={year}
                />
                <StackedBar
                  width={(width * 7) / 10}
                  height={height}
                  year={year}
                  data={filteredMonthlyData}
                />
              </div>
            </>
          )}
        </ParentSize>
      </div>
    </div>
  );
};

export default ChartGroup;
