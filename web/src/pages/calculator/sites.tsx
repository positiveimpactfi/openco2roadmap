import CalculatorPanel from "components/CalculatorPanel";
import Table, { TableCell } from "components/Table";
import { useMyOrganizationSitesQuery } from "graphql/queries/site/myOrganizationSites.generated";

const CalculatorSitesPage = () => {
  const { data } = useMyOrganizationSitesQuery();
  if (!data?.allSitesInMyOrganization) return <div>No organizations</div>;
  const sites = data.allSitesInMyOrganization;
  return (
    <CalculatorPanel
      title="Toimipaikat"
      description="Lyhyt kuvaus sivun sisällöstä. Tähän voi tarvittaessa laittaa linkin tarkempiin ohjeisiin yms. "
    >
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <Table
          headers={[
            "Toimipaikan nimi",
            "Toimipaikan tyyppi",
            "Sijaintikunta",
            "Destinaatio(t)",
            "Yksiköt",
          ]}
        >
          {sites.map((site) => (
            <tr key={site.id}>
              <TableCell value={site.name} />
              <TableCell value={site.siteType.name} />
              <TableCell value={site.municipality.name} />
              <TableCell value={"Destinaatio X"} />
              <TableCell
                value={site.siteUnits
                  ?.map((unit) => unit.name)
                  .filter((unit) => !unit.startsWith("default_"))
                  .join(", ")}
              />
            </tr>
          ))}
        </Table>
      </div>
    </CalculatorPanel>
  );
};

export default CalculatorSitesPage;
