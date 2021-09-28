import { emissionCategories } from "@/shared/categories";
import { emissionSources } from "@/shared/emissionSources";
import { allUnits } from "@/shared/measurementUnits";
import { CategoryType } from "@/shared/types/CategoryType";
import { EmissionSourceType } from "@/shared/types/EmissionSourceType";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import CalculatorPanel from "components/CalculatorPanel";
import CreateDataEntryForm from "components/Forms/Data/CreateDataEntryForm";
import LoadingSpinner from "components/LoadingSpinner";
import OptionsMenu from "components/OptionsMenu";
import ShowDataEntryForm from "components/ShowDataEntry";
import SlideOver from "components/SlideOver";
import Table, { TableCell } from "components/Table";
import WarningModal from "components/Warning";
import { format } from "date-fns";
import { useDeleteEntryMutation } from "graphql/mutations/data/deleteDataEntry.generated";
import {
  MyDataEntriesDocument,
  useMyDataEntriesQuery,
} from "graphql/queries/data/dataEntry.generated";
import { useState } from "react";
import { DataEntry } from "types/generatedTypes";
import { numberToString } from "utils/numberToString";

const CalculatorConsumptionDataPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [dataEntry, setDataEntry] = useState(null);
  const { data, loading } = useMyDataEntriesQuery();
  const [deleteEntry] = useDeleteEntryMutation();
  const dataEntries = data?.myDataEntries;

  const handleEditDataEntry = (entry: DataEntry) => {
    setDataEntry(entry);
    setEditFormOpen(true);
  };

  const handleDeleteDataEntry = (entry: DataEntry) => {
    setDataEntry(entry);
    setWarningOpen(true);
  };

  const handleConfirmDelete = async (id: string) => {
    const res = await deleteEntry({
      variables: { dataEntryID: id },
      refetchQueries: [MyDataEntriesDocument],
    });
    if (res.data) {
      setWarningOpen(false);
    }
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
        <ShowDataEntryForm dataEntry={dataEntry as DataEntry} />
      </SlideOver>
      <WarningModal
        title="Poistetaanko kulutustiedot?"
        description="Haluatko varmasti poistaa alla olevat kulutustiedot? Tätä toimipidettä ei voi perua."
        onConfirm={() => handleConfirmDelete(dataEntry.id)}
        open={warningOpen}
        setOpen={setWarningOpen}
      >
        <ShowDataEntryForm dataEntry={dataEntry} />
      </WarningModal>
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
            {dataEntries.map((entry, index) => (
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
                    onDelete={() => handleDeleteDataEntry(entry as DataEntry)}
                    variant={
                      index === dataEntries.length - 1
                        ? "last-element"
                        : "normal"
                    }
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
