import CalculatorPanel from "components/CalculatorPanel";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { useMyEmissionFactorsQuery } from "graphql/queries/emissions/myEmissionFactors.generated";
import { numberToString } from "utils/numberToString";

const CalculatorEmissionFactorsPage = () => {
  const { data: myEFs } = useMyEmissionFactorsQuery();
  const { data: publicEFs } = useAllPublicEmissionFactorsQuery();

  return (
    <CalculatorPanel
      title="Päästökertoimet"
      description="Tällä sivulla voit tarkastella yleisiä päästökertoimia ja määritellä uusia. Lisäämäsi kertoimet tulevat vain oman organisaatiosi käyttöön. "
    >
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
    </CalculatorPanel>
  );
};

export default CalculatorEmissionFactorsPage;
