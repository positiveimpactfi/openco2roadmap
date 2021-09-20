import { withAuth } from "components/Auth";
import Button from "components/Button";
import CreateSiteForm from "components/Forms/Site/CreateSiteForm";
import CreateSiteTypeForm from "components/Forms/Site/CreateSiteTypeForm";
import LoadingSpinner from "components/LoadingSpinner";
import SettingsPanel from "components/SettingsPanel";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useMyOrganizationSitesQuery } from "graphql/queries/site/myOrganizationSites.generated";
import { useState } from "react";

const SiteSettingsPage = () => {
  const [newSiteTypeOpen, setNewSiteTypeOpen] = useState(false);
  const [createSiteOpen, setCreateSiteOpen] = useState(false);
  const { data, loading } = useMyOrganizationSitesQuery();
  const sites = data?.allSitesInMyOrganization ?? [];
  return (
    <SettingsPanel
      title="Toimipaikat"
      description="Hiilijalanjälkilaskentaan tarvittavat kulutustiedot liittyvät aina konkreettisesti johonkin yrityksesi toimipaikkaan. Tällä sivulla voit määritellä yrityksesi toimipaikkarakenteen."
    >
      <SlideOver
        title="Uusi toimipaikan tyyppi"
        open={newSiteTypeOpen}
        setOpen={setNewSiteTypeOpen}
      >
        <CreateSiteTypeForm setOpen={setNewSiteTypeOpen} />
      </SlideOver>
      <SlideOver
        title="Uusi toimipaikka"
        open={createSiteOpen}
        setOpen={setCreateSiteOpen}
      >
        <CreateSiteForm setOpen={setCreateSiteOpen} />
      </SlideOver>
      <div className="flex space-x-2 mb-4">
        <Button variant="success" onClick={() => setNewSiteTypeOpen(true)}>
          Uusi toimipaikan tyyppi
        </Button>
        <Button variant="success" onClick={() => setCreateSiteOpen(true)}>
          Lisää toimipaikka
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <Table
            headers={[
              "Toimipaikan nimi",
              "Toimipaikan tyyppi",
              "Sijaintikunta",
              "Yksiköt",
              "Muokkaa",
            ]}
            alignLastRight
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
                <TableCellOpenOptions fn={() => console.log("hello")} />
              </tr>
            ))}
          </Table>
        </div>
      )}
    </SettingsPanel>
  );
};

export default withAuth(SiteSettingsPage);
