import { withAuth } from "components/Auth";
import Button from "components/Button";
import CalculatorPanel from "components/CalculatorPanel";
import CreateDataEntryForm from "components/Forms/Data/CreateDataEntryForm";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { allUnits } from "data/measurementUnits";
import { useMyDataEntriesQuery } from "graphql/queries/data/dataEntry.generated";
import { useState } from "react";

const CalculatorConsumptionDataPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { data } = useMyDataEntriesQuery();
  if (!data?.myDataEntries) return <div>no data!</div>;
  const dataEntries = data.myDataEntries;
  return (
    <CalculatorPanel
      title="Kulutustiedot"
      description="Hiilijalanjälkilaskelmat muodostuvat kulutustietoja yhdistelemällä. Tällä sivulla pääset syöttämään ja muokkaamaan yrityksesi kulutustietoja."
    >
      <Button variant="success" onClick={() => setFormOpen(true)}>
        Lisää tietoja
      </Button>
      <SlideOver
        title="Lisää kulutustietoja"
        open={formOpen}
        setOpen={setFormOpen}
      >
        <CreateDataEntryForm setOpen={setFormOpen} />
      </SlideOver>
      <div className="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                    )?.conversionFactor +
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

export default withAuth(CalculatorConsumptionDataPage);
