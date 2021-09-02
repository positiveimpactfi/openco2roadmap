import SettingsPanel from "components/SettingsPanel";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";

const fakeSite = {
  id: 1,
  name: "Inarin hotelli",
  type: "Hotelli",
  municipality: "Inari",
  destination: "Lappi",
  units: "Päärakennus, rantamökit, sauna",
};

const fakeSites = Array(20)
  .fill(fakeSite)
  .map((es, i) => {
    return { ...es, id: es.id + i };
  });

const SiteSettingsPage = () => {
  return (
    <SettingsPanel
      title="Toimipaikat"
      description="Lyhyt kuvaus sivun sisällöstä. Tähän voi tarvittaessa laittaa linkin tarkempiin ohjeisiin yms. "
    >
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <Table
          headers={[
            "Toimipaikan nimi",
            "Toimipaikan tyyppi",
            "Sijaintikunta",
            "Destinaatio(t)",
            "Yksiköt",
            "Muokkaa",
          ]}
        >
          {fakeSites.map((site) => (
            <tr key={site.id}>
              <TableCell value={site.name} />
              <TableCell value={site.type} />
              <TableCell value={site.municipality} />
              <TableCell value={site.destination} />
              <TableCell value={site.units} />
              <TableCellOpenOptions fn={() => console.log("hello")} />
            </tr>
          ))}
        </Table>
      </div>
    </SettingsPanel>
  );
};

export default SiteSettingsPage;
