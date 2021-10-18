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

const SettingsEmissionFactorsPage = () => {
  const { data: myEFs, loading: myLoading } = useMyEmissionFactorsQuery();
  const { data: publicEFs, loading: publicLoading } =
    useAllPublicEmissionFactorsQuery();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <SettingsPanel
      title="Päästökertoimet"
      description="Tällä sivulla voit tarkastella yleisiä päästökertoimia ja määritellä uusia. Lisäämäsi kertoimet tulevat vain oman organisaatiosi käyttöön. "
    >
      <SlideOver
        title="Lisätään uusi päästökerroin"
        open={formOpen}
        setOpen={setFormOpen}
      >
        Uusi kerroin lomake
      </SlideOver>

      <div className="mb-4">
        <Button variant="success" onClick={() => setFormOpen(true)}>
          Lisää uusi päästökerroin
        </Button>
      </div>
      {myLoading || publicLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <Table
                headers={[
                  "Nimi",
                  "Lähde",
                  "Alkaen",
                  "Päättyen",
                  "Uusin arvo",
                  "Tiedot",
                ]}
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
                    <TableCellOpenOptions fn={() => console.log("opened ef")} />
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
                    <TableCellOpenOptions fn={() => console.log("opened ef")} />
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
