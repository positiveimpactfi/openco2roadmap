import { useState } from "react";
import PieChart, { DataEntry } from "./Pie";
import StackedBar from "./StackedBar";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

interface ChartGroupProps {
  data: DataEntry[];
  years: number[];
}

const ChartGroup = ({ data, years }: ChartGroupProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
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
                  data={data}
                  year={year}
                />
                <StackedBar
                  width={(width * 7) / 10}
                  height={height}
                  year={year}
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
