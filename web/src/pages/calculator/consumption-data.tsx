import { withAuth } from "components/Auth";
import Button from "components/Button";
import CalculatorPanel from "components/CalculatorPanel";
import CreateDataEntryForm from "components/Forms/Data/CreateDataEntryForm";
import LoadingSpinner from "components/LoadingSpinner";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { allUnits } from "@/shared/measurementUnits";
import { useMyDataEntriesQuery } from "graphql/queries/data/dataEntry.generated";
import { useState } from "react";
import { numberToString } from "utils/numberToString";
import { format } from "date-fns";
import { emissionSources } from "@/shared/emissionSources";
import { EmissionSourceType } from "@/shared/types/EmissionSourceType";
import { emissionCategories } from "@/shared/categories";
import { CategoryType } from "@/shared/types/CategoryType";
import ShowDataEntryForm from "components/ShowDataEntryForm";
import { DataEntry } from "types/generatedTypes";
import OptionsMenu from "components/OptionsMenu";

const CalculatorConsumptionDataPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [dataEntry, setDataEntry] = useState(null);
  const { data, loading } = useMyDataEntriesQuery();
  const dataEntries = data?.myDataEntries;

  const handleEditDataEntry = (entry: DataEntry) => {
    setDataEntry(entry);
    setEditFormOpen(true);
  };

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
      <SlideOver
        title="Näytetään kulutustietoja"
        open={editFormOpen}
        setOpen={setEditFormOpen}
      >
        <ShowDataEntryForm
          dataEntry={dataEntry as DataEntry}
          setOpen={setEditFormOpen}
        />
      </SlideOver>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <Table
            headers={[
              "Kategoria",
              "Päästölähde",
              "Päästökerroin",
              "Toimipaikka",
              "Alkupäivä",
              "Loppupäivä",
              "Määrä",
              "kg CO2e",
              "Toiminnot",
            ]}
            alignLastRight
          >
            {dataEntries.map((entry) => (
              <tr key={entry.id}>
                <TableCell
                  value={
                    emissionCategories.find(
                      (category) => category.id === CategoryType[entry.category]
                    ).name
                  }
                />
                <TableCell
                  value={
                    emissionSources.find(
                      (es) => es.id === EmissionSourceType[entry.emissionSource]
                    ).name
                  }
                />
                <TableCell
                  value={`${
                    entry.emissionFactorValue.emissionFactor.name
                  } (${numberToString(
                    entry.emissionFactorValue.value
                  )} kg CO2e)`}
                />
                <TableCell
                  value={
                    entry.siteUnit.name.startsWith("default_")
                      ? `${entry.siteUnit.site.name}`
                      : `${entry.siteUnit.name} (${entry.siteUnit.site.name})`
                  }
                />
                <TableCell
                  value={format(new Date(entry.startDate), "dd.MM.yyyy")}
                />
                <TableCell
                  value={format(new Date(entry.endDate), "dd.MM.yyyy")}
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
                    (
                      entry.consumptionValue *
                      entry.emissionFactorValue.value *
                      allUnits.find(
                        (unit) => unit.shorthand === entry.measurementUnit
                      )?.conversionFactor
                    ).toFixed() + " kg CO2e"
                  }
                />
                {/* <TableCellOpenOptions fn={() => handleEditDataEntry(entry)} /> */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <OptionsMenu
                    onShow={() => handleEditDataEntry(entry as DataEntry)}
                    onDelete={() => console.log("clicked delete")}
                  />
                </td>
              </tr>
            ))}
          </Table>
        </div>
      )}
    </CalculatorPanel>
  );
};

export default withAuth(CalculatorConsumptionDataPage);
