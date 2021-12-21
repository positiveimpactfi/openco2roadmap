import { withAuth } from "components/Auth";
import CalculatorPanel from "components/CalculatorPanel";
import LoadingSpinner from "components/LoadingSpinner";
import Table, { TableCell } from "components/Table";
import { useMyOrganizationSitesQuery } from "graphql/queries/site/myOrganizationSites.generated";
import useTranslation from "next-translate/useTranslation";

const CalculatorSitesPage = () => {
  const { t } = useTranslation("calculator");
  const { data, loading } = useMyOrganizationSitesQuery();
  const sites = data?.allSitesInMyOrganization;
  return (
    <CalculatorPanel
      title={t("pages.sites.title")}
      description={t("pages.sites.description")}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table
                  headers={t(
                    "pages.sites.table.headers",
                    {},
                    { returnObjects: true }
                  )}
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
            </div>
          </div>
        </div>
      )}
    </CalculatorPanel>
  );
};

export default withAuth(CalculatorSitesPage);
