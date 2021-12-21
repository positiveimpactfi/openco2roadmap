import { withAuth } from "components/Auth";
import LoadingSpinner from "components/LoadingSpinner";
import SettingsPanel from "components/SettingsPanel";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllEmissionSourcesQuery } from "graphql/queries/emissions/allEmissionSources.generated";
import useTranslation from "next-translate/useTranslation";

const EmissionSourcesSettingsPage = () => {
  const { t } = useTranslation("settings");
  const { data, loading } = useAllEmissionSourcesQuery();
  const emissionSources = data?.allEmissionSources || [];
  return (
    <SettingsPanel
      title={t("pages.emission_sources.title")}
      description={t("pages.emission_sources.description_long")}
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
                    "pages.emission_sources.table.headers",
                    {},
                    { returnObjects: true }
                  )}
                  alignLastRight
                >
                  {emissionSources.map((es) => (
                    <tr key={es.id}>
                      <TableCell value={es.components[0].category.name} />
                      <TableCell value={es.components[0].name} />
                      <TableCell value={es.name} />
                      <TableCell value={es.scope} />
                      <TableCellOpenOptions fn={() => console.log("hello")} />
                    </tr>
                  ))}
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </SettingsPanel>
  );
};

export default withAuth(EmissionSourcesSettingsPage);
