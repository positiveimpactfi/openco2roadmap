import { withAuth } from "components/Auth";
import SettingsPanel from "components/SettingsPanel";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllEmissionSourcesQuery } from "graphql/queries/emissions/allEmissionSources.generated";

const EmissionSourcesSettingsPage = () => {
  const { data } = useAllEmissionSourcesQuery();
  if (!data?.allEmissionSources) return <div>No data</div>;
  const emissionSources = data.allEmissionSources;
  return (
    <SettingsPanel
      title="Päästölähteet"
      description="Hiilijalanjälkilaskennan eri päästölähteiden kanssa käytettävät oletuskertoimet voi määrittää tällä asetussivulla. Jos muutat oletuskerrointa, aiemmin lisäämäsi kulutustiedot pysyvät ennallaan."
    >
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <Table
          headers={[
            "Kategoria",
            "Komponentti",
            "Päästölähde",
            "Sovellusala (oletus)",
            "Päästökerroin (oletus)",
            "Muokkaa",
          ]}
        >
          {emissionSources.map((es) => (
            <tr key={es.id}>
              <TableCell value={es.components[0].category.name} />
              <TableCell value={es.components[0].name} />
              <TableCell value={es.name} />
              <TableCell value={es.scope} />
              <TableCell value={"--"} />
              <TableCellOpenOptions fn={() => console.log("hello")} />
            </tr>
          ))}
        </Table>
      </div>
    </SettingsPanel>
  );
};

export default withAuth(EmissionSourcesSettingsPage);
