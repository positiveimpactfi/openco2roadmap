import CalculatorPanel from "components/CalculatorPanel";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { allUnits } from "data/measumentUnits";
import { useMyDataEntriesQuery } from "graphql/queries/data/dataEntry.generated";

const CalculatorConsumptionDataPage = () => {
  const { data } = useMyDataEntriesQuery();
  if (!data?.myDataEntries) return <div>no data!</div>;
  const dataEntries = data.myDataEntries;
  return (
    <CalculatorPanel title="Kulutustiedot" description="">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <Table
          headers={[
            "Kategoria",
            "Päästölähde",
            "Toimipaikka",
            "Alkupäivä",
            "Loppupäivä",
            "Määrä",
            "kg CO2e",
            "Muokkaa",
          ]}
          alignLastRight
        >
          {dataEntries.map((entry) => (
            <tr key={entry.id}>
              <TableCell value={entry.category} />
              <TableCell value={entry.emissionSource} />
              <TableCell value={entry.siteUnit.name} />
              <TableCell
                value={new Date(entry.startDate).toISOString().split("T")[0]}
              />
              <TableCell
                value={new Date(entry.endDate).toISOString().split("T")[0]}
              />
              <TableCell
                value={
                  entry.consumptionValue.toString() +
                  " " +
                  entry.measurementUnit
                }
              />
              <TableCell
                value={
                  entry.consumptionValue *
                    entry.emissionFactorValue.value *
                    allUnits.find(
                      (unit) => unit.shorthand === entry.measurementUnit
                    ).conversionFactor +
                  " kg CO2e"
                }
              />
              <TableCellOpenOptions fn={() => console.log("edit data entry")} />
            </tr>
          ))}
        </Table>
      </div>
    </CalculatorPanel>
  );
};

export default CalculatorConsumptionDataPage;
