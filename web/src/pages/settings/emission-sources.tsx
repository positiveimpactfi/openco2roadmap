import SettingsPanel from "components/SettingsPanel";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";

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

const EmissionSourcesSettingsPage = () => {
  return (
    <SettingsPanel
      title="Päästölähteet"
      description="Tälle sivulle tulee valmis listaus yrityksen  päästölähteistä, kolmelle tasolle ryhmiteltynä (kategoria, komponentti, päästölähde). Yrityksen pääkäyttäjä voi muokata päästölähteiden asetuksia. Ainakin oletuspäästökerroin on suositeltavaa määritellä."
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
          {emissionSources.map((emissionSource) => (
            <tr key={emissionSource.id}>
              <TableCell value={emissionSource.category} />
              <TableCell value={emissionSource.component} />
              <TableCell value={emissionSource.emissionSource} />
              <TableCell value={emissionSource.scope} />
              <TableCell value={emissionSource.emissionFactor} />
              <TableCellOpenOptions fn={() => console.log("hello")} />
            </tr>
          ))}
        </Table>
      </div>
    </SettingsPanel>
  );
};

export default EmissionSourcesSettingsPage;
