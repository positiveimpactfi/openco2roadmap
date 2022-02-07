import { withAuth } from "components/Auth";
import SettingsPanel from "components/SettingsPanel";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { useMyEmissionFactorsQuery } from "graphql/queries/emissions/myEmissionFactors.generated";
import { numberToString } from "utils/numberToString";
import Button from "components/Button";
import SlideOver from "components/SlideOver";
import { useState } from "react";
import LoadingSpinner from "components/LoadingSpinner";
import useTranslation from "next-translate/useTranslation";
import CreateEmissionFactorForm from "components/Forms/Emissions/CreateEmissionFactor";
import { EmissionFactor } from "types/generatedTypes";
import ShowEmissionFactor from "components/EmissionFactorView";

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
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Table
                headers={t(
                  "pages.emission_factors.table.headers",
                  {},
                  { returnObjects: true }
                )}
                alignLastRight
              >
                {myEFs?.myEmissionFactors.map((ef) => (
                  <tr key={ef.id}>
                    <TableCell value={ef.name} clamped />
                    <TableCell value={ef.source} clamped />
                    <TableCell
                      value={[...ef.values]
                        .sort((a, b) => a.startDate - b.startDate)[0]
                        .startDate.toString()}
                    />
                    <TableCell
                      value={[...ef.values]
                        .sort((a, b) => b.endDate - a.endDate)[0]
                        .endDate.toString()}
                    />
                    <TableCell
                      value={
                        numberToString(
                          [...ef.values].sort(
                            (a, b) => b.endDate - a.endDate
                          )[0].value
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
                <tr className="h-6 bg-gray-100">
                  <td className="p-2">Kaikki julkiset kertoimet</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {publicEFs?.allPublicEmissionFactors.map((ef) => (
                  <tr key={ef.id}>
                    <TableCell value={ef.name} clamped />
                    <TableCell value={ef.source} clamped />
                    <TableCell
                      value={[...ef.values]
                        .sort((a, b) => a.startDate - b.startDate)[0]
                        .startDate.toString()}
                    />
                    <TableCell
                      value={[...ef.values]
                        .sort((a, b) => b.endDate - a.endDate)[0]
                        .endDate.toString()}
                    />
                    <TableCell
                      value={
                        numberToString(
                          [...ef.values].sort(
                            (a, b) => b.endDate - a.endDate
                          )[0].value
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
            </div>
          </div>
        </div>
      )}
    </SettingsPanel>
  );
};

export default withAuth(SettingsEmissionFactorsPage);
