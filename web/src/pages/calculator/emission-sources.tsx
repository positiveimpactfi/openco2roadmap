import CalculatorPanel from "components/CalculatorPanel";
import Table, { TableCell } from "components/Table";

const fakeEmissionSource = {
  id: 1,
  category: "Toimitilat ja kiinteistöt",
  component: "Lämmitys",
  emissionSource: "Oma lämmöntuotanto",
  scope: "Scope 1",
  emissionFactor: "Helen kaukolämpö (0.141 kg CO2e)",
};

const emissionSources = Array(20)
  .fill(fakeEmissionSource)
  .map((es, i) => {
    return { ...es, id: es.id + i };
  });

const CalculatorEmissionSourcesPage = () => {
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
          {emissionSources.map((emissionSource) => (
            <tr key={emissionSource.id}>
              <TableCell value={emissionSource.category} />
              <TableCell value={emissionSource.component} />
              <TableCell value={emissionSource.emissionSource} />
              <TableCell value={emissionSource.scope} />
              <TableCell value={emissionSource.emissionFactor} />
            </tr>
          ))}
        </Table>
      </div>
    </CalculatorPanel>
  );
};

export default CalculatorEmissionSourcesPage;
