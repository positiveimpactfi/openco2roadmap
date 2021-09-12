import CalculatorPanel from "components/CalculatorPanel";
import Table, { TableCell } from "components/Table";
import { useAllEmissionSourcesQuery } from "graphql/queries/emissions/allEmissionSources.generated";

const CalculatorEmissionSourcesPage = () => {
  const { data } = useAllEmissionSourcesQuery();
  if (!data?.allEmissionSources) return <div>No data</div>;
  const emissionSources = data.allEmissionSources;
  return (
    <CalculatorPanel
      title="Päästölähteet"
      description="Tällä sivulla voit tarkastella yleisiä päästökertoimia ja määritellä uusia. Lisäämäsi kertoimet tulevat vain oman organisaatiosi käyttöön. "
    >
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
    </CalculatorPanel>
  );
};

export default CalculatorEmissionSourcesPage;
