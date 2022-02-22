import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend";

const Legend = ({
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
        <div className="h-full">
          <h1 className="pb-4 text-xl font-semibold">Päästökategoriat</h1>
          <div className="flex h-full flex-col justify-center rounded-md bg-white px-2">
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
        </div>
      )}
    </LegendOrdinal>
  );
};

export default Legend;
