import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllEmissionFactorsQuery } from "graphql/queries/emissions/allEmissionFactors.generated";
import { numberToString } from "utils/numberToString";

const AdminEmissionFactorsPage = () => {
  const { data, loading } = useAllEmissionFactorsQuery();
  const emissionFactors = data?.allEmissionFactors;
  return (
    <AdminsOnly
      title="Päästökertoimet"
      description="Tällä sivulla voit tarkastella kaikki järjestelmän päästökertoimet ja määritellä uusia."
    >
      <div className="mb-4">
        <Button
          variant="success"
          disabled
          onClick={() => console.log("clicked create new ef button")}
        >
          Lisää uusi kerroin
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
            "Luonut",
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
                    [...ef.values].sort((a, b) => b.endDate - a.endDate)[0]
                      .value
                  ) +
                  " kg CO2e/" +
                  ef.physicalQuantity.baseUnit.shorthand
                }
              />
              <TableCell value={ef.creator ? ef.creator.name : "-"} />
              <TableCellOpenOptions fn={() => console.log("opened ef")} />
            </tr>
          ))}
        </Table>
      )}
    </AdminsOnly>
  );
};

export default withAuth(AdminEmissionFactorsPage);
