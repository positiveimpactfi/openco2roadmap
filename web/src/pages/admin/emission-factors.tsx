import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import ShowEmissionFactor from "components/EmissionFactorView";
import LoadingSpinner from "components/LoadingSpinner";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { useState } from "react";
import { EmissionFactor } from "types/generatedTypes";
import { numberToString } from "utils/numberToString";

const AdminEmissionFactorsPage = () => {
  const { data, loading } = useAllPublicEmissionFactorsQuery();
  const [open, setOpen] = useState(false);
  const [selectedEf, setSelectedEf] = useState<EmissionFactor>(null);
  const emissionFactors = data?.allPublicEmissionFactors;

  const handleShowEf = (ef: EmissionFactor) => {
    setSelectedEf(ef);
    setOpen(true);
  };

  return (
    <AdminsOnly
      title="Päästökertoimet"
      description="Tällä sivulla voit tarkastella kaikki järjestelmän päästökertoimet ja määritellä uusia."
    >
      <div>
        <SlideOver
          open={open}
          setOpen={setOpen}
          title="Tarkastellaan päästökerrointa"
        >
          <ShowEmissionFactor ef={selectedEf} onClose={setOpen} />
        </SlideOver>
      </div>
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
