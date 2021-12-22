import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import ShowEmissionFactor from "components/EmissionFactorView";
import CreateEmissionFactorForm from "components/Forms/Emissions/CreateEmissionFactor";
import LoadingSpinner from "components/LoadingSpinner";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { EmissionFactor } from "types/generatedTypes";
import { compareString } from "utils/compareStrings";
import { numberToString } from "utils/numberToString";

const AdminEmissionFactorsPage = () => {
  const { t } = useTranslation("admin");
  const { data, loading } = useAllPublicEmissionFactorsQuery();
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEf, setSelectedEf] = useState<EmissionFactor>(null);
  const emissionFactors = data?.allPublicEmissionFactors
    ? [...data.allPublicEmissionFactors].sort((a, b) =>
        compareString(a.name, b.name)
      )
    : [];

  const handleShowEf = (ef: EmissionFactor) => {
    setSelectedEf(ef);
    setOpen(true);
  };

  return (
    <AdminsOnly
      title={t("pages.emission_factors.title")}
      description={t("pages.emission_factors.description_long")}
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table
          headers={[
            "Nimi",
            "Lähde",
            "Alkaen",
            "Päättyen",
            "Uusin arvo",
            "Tiedot",
          ]}
          alignLastRight
        >
          {emissionFactors?.map((ef) => (
            <tr key={ef.id}>
              <TableCell value={ef.name} />
              <TableCell value={ef.source} />
              <TableCell
                value={[...ef.values]
                  ?.sort((a, b) => a.startDate - b.startDate)[0]
                  ?.startDate.toString()}
              />
              <TableCell
                value={[...ef.values]
                  .sort((a, b) => b.endDate - a.endDate)[0]
                  ?.endDate.toString()}
              />
              <TableCell
                value={
                  numberToString(
                    [...ef.values].sort((a, b) => b.endDate - a.endDate)[0]
                      ?.value
                  ) +
                  " kg CO2e/" +
                  ef.physicalQuantity.baseUnit.shorthand
                }
              />
              <TableCellOpenOptions
                fn={() => handleShowEf(ef as EmissionFactor)}
              />
            </tr>
          ))}
        </Table>
      )}
    </AdminsOnly>
  );
};

export default withAuth(AdminEmissionFactorsPage);
