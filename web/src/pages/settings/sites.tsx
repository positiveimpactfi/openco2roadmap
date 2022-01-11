import { withAuth } from "components/Auth";
import Button from "components/Button";
import CreateSiteForm from "components/Forms/Site/CreateSiteForm";
import CreateSiteTypeForm from "components/Forms/Site/CreateSiteTypeForm";
import EditSiteForm from "components/Forms/Site/EditSiteForm";
import LoadingSpinner from "components/LoadingSpinner";
import SettingsPanel from "components/SettingsPanel";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useMyOrganizationSitesQuery } from "graphql/queries/site/myOrganizationSites.generated";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Site } from "types/generatedTypes";

const SiteSettingsPage = () => {
  const { t } = useTranslation("settings");
  const [newSiteTypeOpen, setNewSiteTypeOpen] = useState(false);
  const [createSiteOpen, setCreateSiteOpen] = useState(false);
  const [editSiteOpen, setEditSiteOpen] = useState(false);
  const [site, setSite] = useState<Site>(null);
  const { data, loading } = useMyOrganizationSitesQuery();
  const sites = data?.allSitesInMyOrganization ?? [];

  const handleSiteChange = (s: Site) => {
    setSite(s);
    setEditSiteOpen(true);
  };

  return (
    <SettingsPanel
      title={t("pages.sites.title")}
      description={t("pages.sites.description_long")}
    >
      <SlideOver
        title={t("pages.sites.actions.add_site_type")}
        open={newSiteTypeOpen}
        setOpen={setNewSiteTypeOpen}
      >
        <CreateSiteTypeForm setOpen={setNewSiteTypeOpen} />
      </SlideOver>
      <SlideOver
        title={t("pages.sites.actions.add_site")}
        open={createSiteOpen}
        setOpen={setCreateSiteOpen}
      >
        <CreateSiteForm setOpen={setCreateSiteOpen} />
      </SlideOver>
      <SlideOver
        title={t("pages.sites.actions.edit_site")}
        open={editSiteOpen}
        setOpen={setEditSiteOpen}
      >
        <EditSiteForm setOpen={setEditSiteOpen} site={site} />
      </SlideOver>
      <div className="flex space-x-2 mb-4">
        <Button variant="success" onClick={() => setNewSiteTypeOpen(true)}>
          {t("pages.sites.actions.add_site_type")}
        </Button>
        <Button variant="success" onClick={() => setCreateSiteOpen(true)}>
          {t("pages.sites.actions.add_site")}
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table
                  headers={t(
                    "pages.sites.table.headers",
                    {},
                    { returnObjects: true }
                  )}
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
                      <TableCellOpenOptions
                        fn={() => handleSiteChange(site as Site)}
                      />
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

export default withAuth(SiteSettingsPage);
