import { withAuth } from "components/Auth";
import CalculatorPanel from "components/CalculatorPanel";
import LoadingSpinner from "components/LoadingSpinner";
import Table, { TableCell } from "components/Table";
import { useAllEmissionSourcesQuery } from "graphql/queries/emissions/allEmissionSources.generated";

const CalculatorEmissionSourcesPage = () => {
  const { data, loading } = useAllEmissionSourcesQuery();
  const emissionSources = data?.allEmissionSources;
  return (
    <CalculatorPanel
      title="Päästölähteet"
      description="Tällä sivulla näet, mitä päästölähteitä yrityksesi laskentaan sisältyy, ja mitä päästökertoimia eri kulutustiedoissa käytetään. Oletuskertoimia pääsee muokkaamaan Asetukset-osion kautta."
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table
                  headers={[
                    "Kategoria",
                    "Komponentti",
                    "Päästölähde",
                    "Sovellusala (oletus)",
                    "Päästökerroin (oletus)",
                  ]}
                >
                  {emissionSources.map((es) => (
                    <tr key={es.id}>
                      <TableCell value={es.components[0].category.name} />
                      <TableCell value={es.components[0].name} />
                      <TableCell value={es.name} />
                      <TableCell value={es.scope} />
                      <TableCell value={"--"} />
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

export default withAuth(CalculatorEmissionSourcesPage);
