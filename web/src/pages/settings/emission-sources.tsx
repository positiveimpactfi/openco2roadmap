import { withAuth } from "components/Auth";
import LoadingSpinner from "components/LoadingSpinner";
import SettingsPanel from "components/SettingsPanel";
import Table, { TableCell } from "components/Tables/SimpleTable";
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
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <Table
                  headers={t(
                    "pages.emission_sources.table.headers",
                    {},
                    { returnObjects: true }
                  )}
                >
                  {emissionSources.map((es) => {
                    const components = es.components
                      .map((c) => c.name)
                      .sort()
                      .join(", ");
                    return (
                      <tr key={es.id}>
                        <TableCell value={es.components[0].category.name} />
                        <TableCell value={components} />
                        <TableCell value={es.name} />
                        <TableCell
                          value={
                            es.scope.slice(0, 5) + " " + es.scope.charAt(5)
                          }
                        />
                      </tr>
                    );
                  })}
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
