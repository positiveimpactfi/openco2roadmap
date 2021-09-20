import { withAuth } from "components/Auth";
import CalculatorPanel from "components/CalculatorPanel";
import LoadingSpinner from "components/LoadingSpinner";
import Table, { TableCell } from "components/Table";
import { useMyOrganizationSitesQuery } from "graphql/queries/site/myOrganizationSites.generated";

const CalculatorSitesPage = () => {
  const { data, loading } = useMyOrganizationSitesQuery();
  const sites = data?.allSitesInMyOrganization;
  return (
    <CalculatorPanel
      title="Toimipaikat"
      description="Hiilijalanjälkilaskentaan tarvittavat kulutustiedot liittyvät aina konkreettisesti johonkin yrityksesi toimipaikkaan. Tällä sivulla näet yrityksesi hiilijalanjälkilaskennassa käytetyn toimipaikkarakenteen."
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <Table
            headers={[
              "Toimipaikan nimi",
              "Toimipaikan tyyppi",
              "Sijaintikunta",
              "Yksiköt",
            ]}
          >
            {sites.map((site) => (
              <tr key={site.id}>
                <TableCell value={site.name} />
                <TableCell value={site.siteType.name} />
                <TableCell value={site.municipality.name} />
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
      )}
    </CalculatorPanel>
  );
};

export default withAuth(CalculatorSitesPage);
