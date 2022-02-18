import { emissionCategories } from "@/shared/categories";
import { emissionSources } from "@/shared/emissionSources";
import { allUnits } from "@/shared/measurementUnits";
import { CategoryType } from "@/shared/types/CategoryType";
import { EmissionSourceType } from "@/shared/types/EmissionSourceType";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import CalculatorPanel from "components/CalculatorPanel";
import CreateDataEntryForm from "components/Forms/Data/CreateDataEntryForm";
import EditDataEntryForm from "components/Forms/Data/EditDataEntryForm";
import LoadingSpinner from "components/LoadingSpinner";
import OptionsMenu from "components/OptionsMenu";
import ShowDataEntryForm from "components/ShowDataEntry";
import SlideOver from "components/SlideOver";
import { Table } from "components/Tables/Table";
import WarningModal from "components/Warning";
import { format } from "date-fns";
import { useDeleteEntryMutation } from "graphql/mutations/data/deleteDataEntry.generated";
import {
  MyOrganizationDataEntriesDocument,
  useMyOrganizationDataEntriesQuery,
} from "graphql/queries/data/myOrganizationDataEntries.generated";
import useTranslation from "next-translate/useTranslation";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { DataEntry } from "types/generatedTypes";
import { numberToString } from "utils/numberToString";

const CalculatorConsumptionDataPage = () => {
  const { t } = useTranslation("calculator");
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [showEntryOpen, setShowEntryOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [dataEntry, setDataEntry] = useState(null);
  const { data, loading } = useMyOrganizationDataEntriesQuery();
  const [deleteEntry] = useDeleteEntryMutation();

  const handleShowEntry = (entry: DataEntry) => {
    setDataEntry(entry);
    setShowEntryOpen(true);
  };

  const handleEditEntry = (entry: DataEntry) => {
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
      refetchQueries: [MyOrganizationDataEntriesDocument],
      awaitRefetchQueries: true,
    });
    if (res.data) {
      setWarningOpen(false);
    }
  };

  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "Kategoria",
        accessor: "categoryName",
      },
      {
        Header: "Päästölähde",
        accessor: "emissionSourceName",
      },
      {
        Header: "Päästökerroin",
        accessor: "efValue",
        Cell: ({ value, row }) =>
          `${
            (row.original as DataEntry).emissionFactorValue.emissionFactor.name
          } (${numberToString(value)} kg CO2e)`,
      },
      {
        Header: "Toimipaikka",
        accessor: "site",
      },
      {
        Header: "kk/vuosi",
        accessor: "date",
        Cell: ({ value }) => format(new Date(value), "MM/yyyy"),
      },
      {
        Header: "Määrä",
        accessor: "consumption",
        Cell: ({ value, row }) =>
          (value as number).toLocaleString() +
          " " +
          (row.original as DataEntry).measurementUnit,
      },
      {
        Header: "kg CO2e",
        accessor: "footprint",
        Cell: ({ value }) => numberToString(value as number) + " kg CO2e",
      },
      {
        Header: "Tiedot",
        disableSortBy: true,
        Cell: ({ row }) => (
          <OptionsMenu
            onShow={() => handleShowEntry(row.original as DataEntry)}
            onEdit={() => handleEditEntry(row.original as DataEntry)}
            onDelete={() => handleDeleteDataEntry(row.original as DataEntry)}
            variant={
              row.index === data?.myOrganizationDataEntries?.length - 1
                ? "last-element"
                : "normal"
            }
          />
        ),
      },
    ],
    [data]
  );
  const tableData = useMemo(() => {
    let dataEntries = data?.myOrganizationDataEntries ?? [];
    return dataEntries?.map((entry) => {
      return {
        ...entry,
        categoryName: emissionCategories.find(
          (category) => category.id === CategoryType[entry.category]
        )?.name,
        emissionSourceName: emissionSources.find(
          (es) => es.id === EmissionSourceType[entry.emissionSource]
        )?.name,
        efValue: entry.emissionFactorValue.value,
        site: entry.siteUnit.name.startsWith("default_")
          ? `${entry.siteUnit.site.name}`
          : `${entry.siteUnit.name} (${entry.siteUnit.site.name})`,
        date: entry.startDate,
        consumption: entry.consumptionValue,
        footprint:
          entry.consumptionValue *
          entry.emissionFactorValue.value *
          allUnits.find((unit) => unit.shorthand === entry.measurementUnit)
            ?.conversionFactor,
      };
    });
  }, [data]);

  return (
    <CalculatorPanel
      title={t("pages.consumption_data.title")}
      description={t("pages.consumption_data.description")}
    >
      <Button variant="success" onClick={() => setCreateFormOpen(true)}>
        {t("pages.consumption_data.actions.add_data")}
      </Button>
      <SlideOver
        title={t("pages.consumption_data.actions.add_data")}
        open={createFormOpen}
        setOpen={setCreateFormOpen}
      >
        <CreateDataEntryForm setOpen={setCreateFormOpen} />
      </SlideOver>
      <SlideOver
        title={t("pages.consumption_data.actions.show_data")}
        open={showEntryOpen}
        setOpen={setShowEntryOpen}
      >
        <ShowDataEntryForm
          dataEntry={dataEntry as DataEntry}
          setOpen={setShowEntryOpen}
        />
      </SlideOver>
      <SlideOver
        title={t("pages.consumption_data.actions.edit_data")}
        open={editFormOpen}
        setOpen={setEditFormOpen}
      >
        <EditDataEntryForm setOpen={setEditFormOpen} dataEntry={dataEntry} />
      </SlideOver>
      <WarningModal
        title={t("pages.consumption_data.actions.delete_data.warning.title")}
        description={t(
          "pages.consumption_data.actions.delete_data.warning.description"
        )}
        onConfirm={() => handleConfirmDelete(dataEntry.id)}
        open={warningOpen}
        setOpen={setWarningOpen}
      >
        <ShowDataEntryForm dataEntry={dataEntry} />
      </WarningModal>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table columns={columns} data={tableData} />
      )}
    </CalculatorPanel>
  );
};

export default withAuth(CalculatorConsumptionDataPage);
