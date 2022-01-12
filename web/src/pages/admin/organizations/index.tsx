import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import NewOrganizationForm from "components/Forms/Organization/NewOrganizationForm";
import LoadingSpinner from "components/LoadingSpinner";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllOrganizationsQuery } from "graphql/queries/organization/allOrganizations.generated";
import { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Organization } from "types/generatedTypes";

const Organizations = () => {
  const { t } = useTranslation("admin");
  const { data, loading } = useAllOrganizationsQuery();
  const [editOrgFormOpen, setEditOrgFormOpen] = useState(false);
  const [newOrgFormOpen, setNewOrgFormOpen] = useState(false);
  const [orgUnderEdit, setOrgUnderEdit] = useState(null);

  const handleEditOrg = (org: MyOrganization) => {
    setOrgUnderEdit(org);
    setEditOrgFormOpen(true);
  };

  const organizations = data?.allOrganizations;

  return (
    <AdminsOnly
      title={t("pages.orgs.title")}
      description={t("pages.orgs.description_long")}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SlideOver
            title={t("pages.orgs.actions.add_org")}
            open={newOrgFormOpen}
            setOpen={setNewOrgFormOpen}
          >
            <NewOrganizationForm setSlideoverOpen={setNewOrgFormOpen} />
          </SlideOver>
          <SlideOver
            title={t("pages.orgs.actions.edit_org")}
            open={editOrgFormOpen}
            setOpen={setEditOrgFormOpen}
          >
            <EditOrganizationForm
              org={orgUnderEdit}
              setSlideoverOpen={setEditOrgFormOpen}
            />
          </SlideOver>
          <div className="mb-4">
            <Button onClick={() => setNewOrgFormOpen(true)} variant="success">
              {t("pages.orgs.actions.add_org")}
            </Button>
          </div>
          <OrganizationsTable
            handleFormOpen={handleEditOrg}
            organizations={organizations}
            t={t}
          />
        </>
      )}
    </AdminsOnly>
  );
};

export type MyOrganization = Partial<Organization>;

interface OrgTableProps {
  handleFormOpen: (org: MyOrganization) => void;
  organizations: Organization[];
  t: Translate;
}

const OrganizationsTable: React.FC<OrgTableProps> = ({
  handleFormOpen,
  organizations,
  t,
}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-4">
            <Table
              headers={t(
                "pages.orgs.table.headers",
                {},
                { returnObjects: true }
              )}
            >
              {organizations?.map((org) => (
                <tr key={org.id}>
                  <TableCell value={org.name} />
                  <TableCell value={org.businessID} />
                  <TableCell value={org.municipality?.name} />
                  <TableCell value={org.businessField?.name} />
                  <TableCell value="10.10.2020" />
                  <TableCell value={Date()} />
                  <TableCellOpenOptions fn={() => handleFormOpen(org)} />
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Organizations);
