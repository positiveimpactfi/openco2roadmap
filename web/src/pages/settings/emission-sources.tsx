import { emissionCategories as ec } from "@/shared/categories";
import { withAuth } from "components/Auth";
import LoadingSpinner from "components/LoadingSpinner";
import SettingsPanel from "components/SettingsPanel";
import Table, { TableCell } from "components/Tables/SimpleTable";
import { useAllEmissionSourcesQuery } from "graphql/queries/emissions/allEmissionSources.generated";
import useTranslation from "next-translate/useTranslation";

export const categoriesInOrder = [ec[0], ec[1], ec[3], ec[2]];

const EmissionSourcesSettingsPage = () => {
  const { t } = useTranslation("settings");
  const { data, loading } = useAllEmissionSourcesQuery();
  const emissionSources = data?.allEmissionSources;
  type EmissionSourceType = typeof emissionSources[0];
  type ReducedES = EmissionSourceType & { category: string };
  const reducedEmissionSources = emissionSources?.reduce((prev, current) => {
    return prev.concat({
      ...current,
      category: current.components[0].category.name,
    });
  }, [] as ReducedES[]);

  const sortedEmissionSources = reducedEmissionSources?.sort((a, b) => {
    const ai = categoriesInOrder.findIndex((c) => c.name === a.category);
    const bi = categoriesInOrder.findIndex((c) => c.name === b.category);
    if (ai === bi) return a.name.localeCompare(b.name);
    return ai - bi;
  });

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
                  {sortedEmissionSources.map((es) => {
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
