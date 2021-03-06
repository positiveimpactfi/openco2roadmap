import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import ShowEmissionFactor from "components/EmissionFactorView";
import CreateEmissionFactorForm from "components/Forms/Emissions/CreateEmissionFactor";
import SlideOver from "components/SlideOver";
import { Table, TableActionButton } from "components/Tables/Table";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import useTranslation from "next-translate/useTranslation";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { EmissionFactor } from "types/generatedTypes";
import { compareString } from "utils/compareStrings";
import { numberToString } from "utils/numberToString";

const AdminEmissionFactorsPage = () => {
  const { t } = useTranslation("admin");
  const { data } = useAllPublicEmissionFactorsQuery();
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEf, setSelectedEf] = useState<EmissionFactor>(null);
  const emissionFactors = useMemo(
    () =>
      data?.allPublicEmissionFactors
        ? [...data.allPublicEmissionFactors].sort((a, b) =>
            compareString(a.name, b.name)
          )
        : [],
    [data]
  );

  const handleShowEf = (ef: EmissionFactor) => {
    setSelectedEf(ef);
    setOpen(true);
  };

  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "Nimi",
        accessor: "name",
      },
      {
        Header: "Lähde",
        accessor: "source",
      },
      {
        Header: "Alkaen",
        accessor: "startDate",
      },
      {
        Header: "Päättyen",
        accessor: "endDate",
      },
      {
        Header: "Uusin Arvo",
        accessor: "latestValue",
        Cell: ({ value, row }) =>
          numberToString(value) +
          " kg CO2e/" +
          (row.original as EmissionFactor).physicalQuantity.baseUnit.shorthand,
      },
      {
        Header: "Tiedot",
        disableSortBy: true,
        Cell: ({ row }) => (
          <TableActionButton
            fn={() => handleShowEf(row.original as EmissionFactor)}
          />
        ),
      },
    ],
    []
  );
  const tableData = useMemo(() => {
    return emissionFactors.map((ef) => {
      return {
        ...ef,
        startDate: [...ef.values]
          ?.sort((a, b) => a.startDate - b.startDate)[0]
          ?.startDate.toString(),
        endDate: [...ef.values]
          .sort((a, b) => b.endDate - a.endDate)[0]
          ?.endDate.toString(),
        latestValue: [...ef.values].sort((a, b) => b.endDate - a.endDate)[0]
          ?.value,
      };
    });
  }, [emissionFactors]);

  return (
    <AdminsOnly
      title={t("pages.emission_factors.title")}
      description={t("pages.emission_factors.description_long")}
      onlySuperAdmin
    >
      <div>
        <SlideOver
          open={open}
          setOpen={setOpen}
          title={t("pages.emission_factors.actions.show_ef")}
        >
          <ShowEmissionFactor ef={selectedEf} onClose={setOpen} />
        </SlideOver>
        <SlideOver
          open={formOpen}
          setOpen={setFormOpen}
          title={t("pages.emission_factors.actions.add_ef.description")}
        >
          <CreateEmissionFactorForm onClose={setFormOpen} />
        </SlideOver>
      </div>
      <div className="mb-4">
        <Button variant="success" onClick={() => setFormOpen(true)}>
          {t("pages.emission_factors.actions.add_ef.title")}
        </Button>
      </div>
      <Table columns={columns} data={tableData} />
    </AdminsOnly>
  );
};

export default withAuth(AdminEmissionFactorsPage);
