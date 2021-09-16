import { withAuth } from "components/Auth";
import SettingsPanel from "components/SettingsPanel";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { useMyEmissionFactorsQuery } from "graphql/queries/emissions/myEmissionFactors.generated";
import { numberToString } from "utils/numberToString";
import Button from "components/Button";
import SlideOver from "components/SlideOver";
import { useState } from "react";

const SettingsEmissionFactorsPage = () => {
  const { data: myEFs } = useMyEmissionFactorsQuery();
  const { data: publicEFs } = useAllPublicEmissionFactorsQuery();
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
            <TableCell value={ef.name} />
            <TableCell value={ef.source} />
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
                  [...ef.values].sort((a, b) => b.endDate - a.endDate)[0].value
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
            <TableCell value={ef.name} />
            <TableCell value={ef.source} />
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
                  [...ef.values].sort((a, b) => b.endDate - a.endDate)[0].value
                ) +
                " kg CO2e/" +
                ef.physicalQuantity.baseUnit.shorthand
              }
            />
            <TableCellOpenOptions fn={() => console.log("opened ef")} />
          </tr>
        ))}
      </Table>
    </SettingsPanel>
  );
};

export default withAuth(SettingsEmissionFactorsPage);
