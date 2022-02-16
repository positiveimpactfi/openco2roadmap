import { withAuth } from "components/Auth";
import Button from "components/Button";
import ShowEmissionFactor from "components/EmissionFactorView";
import CreateEmissionFactorForm from "components/Forms/Emissions/CreateEmissionFactor";
import LoadingSpinner from "components/LoadingSpinner";
import SettingsPanel from "components/SettingsPanel";
import SlideOver from "components/SlideOver";
import { Table, TableActionButton } from "components/Tables/Table";
import {
  AllPublicEmissionFactorsQuery,
  useAllPublicEmissionFactorsQuery,
} from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import {
  MyEmissionFactorsQuery,
  useMyEmissionFactorsQuery,
} from "graphql/queries/emissions/myEmissionFactors.generated";
import useTranslation from "next-translate/useTranslation";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { EmissionFactor } from "types/generatedTypes";
import { numberToString } from "utils/numberToString";

const SettingsEmissionFactorsPage = () => {
  const { t } = useTranslation("settings");
  const { data: myEFs, loading: myLoading } = useMyEmissionFactorsQuery();
  const { data: publicEFs, loading: publicLoading } =
    useAllPublicEmissionFactorsQuery();
  const [formOpen, setFormOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [selectedEf, setSelectedEf] = useState<EmissionFactor>(null);

  const handleShowEf = (ef: EmissionFactor) => {
    setSelectedEf(ef);
    setShowOpen(true);
  };

  return (
    <SettingsPanel
      title={t("pages.emission_factors.title")}
      description={t("pages.emission_factors.description_long")}
    >
      <SlideOver
        open={showOpen}
        setOpen={setShowOpen}
        title={t("pages.emission_factors.actions.show_ef")}
      >
        <ShowEmissionFactor ef={selectedEf} onClose={setShowOpen} />
      </SlideOver>
      <SlideOver
        title={t("pages.emission_factors.actions.new_ef.description")}
        open={formOpen}
        setOpen={setFormOpen}
      >
        <CreateEmissionFactorForm onClose={setFormOpen} />
      </SlideOver>

      <div className="mb-4">
        <Button variant="success" onClick={() => setFormOpen(true)}>
          {t("pages.emission_factors.actions.new_ef.title")}
        </Button>
      </div>
      {myLoading || publicLoading ? (
        <LoadingSpinner />
      ) : (
        <UserEmissionFactorsTable
          handleShowEf={handleShowEf}
          myEfs={myEFs}
          publicEfs={publicEFs}
        />
      )}
    </SettingsPanel>
  );
};

interface TableProps {
  myEfs: MyEmissionFactorsQuery;
  publicEfs: AllPublicEmissionFactorsQuery;
  handleShowEf: (ef: EmissionFactor) => void;
}

const mapEmissionFactors = (efs: EmissionFactor[], origin: string) => {
  return efs.map((ef) => {
    return {
      ...ef,
      origin: origin,
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
};

const UserEmissionFactorsTable = ({
  handleShowEf,
  myEfs,
  publicEfs,
}: TableProps) => {
  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "Nimi",
        accessor: "name",
      },
      {
        Header: "Alkuperä",
        accessor: "origin",
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
    [handleShowEf]
  );

  const tableData = useMemo(() => {
    const myFactors = myEfs?.myEmissionFactors ?? [];
    const publicFactors = publicEfs?.allPublicEmissionFactors ?? [];
    const allFactors = mapEmissionFactors(
      myFactors as EmissionFactor[],
      "Oma kerroin"
    ).concat(
      mapEmissionFactors(publicFactors as EmissionFactor[], "CO2-laskuri")
    );
    return allFactors;
  }, [myEfs, publicEfs]);

  return <Table columns={columns} data={tableData} />;
};

export default withAuth(SettingsEmissionFactorsPage);
