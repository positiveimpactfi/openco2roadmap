import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import Collapsible from "components/Collapsible";
import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import NewOrganizationForm from "components/Forms/Organization/NewOrganizationForm";
import LoadingSpinner from "components/LoadingSpinner";
import SlideOver from "components/SlideOver";
import Table, {
  TableCell,
  TableCellOpenOptions,
} from "components/Tables/SimpleTable";
import { useAllOrganizationsQuery } from "graphql/queries/organization/allOrganizations.generated";
import { useAllRegistrationRequestsQuery } from "graphql/queries/organization/allRegistrationRequests.generated";
import { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Organization } from "types/generatedTypes";

const Organizations = () => {
  const { t } = useTranslation("admin");
  const { data, loading } = useAllOrganizationsQuery();
  const { data: allRegistrationRequests } = useAllRegistrationRequestsQuery();
  const [editOrgFormOpen, setEditOrgFormOpen] = useState(false);
  const [newOrgFormOpen, setNewOrgFormOpen] = useState(false);
  const [orgUnderEdit, setOrgUnderEdit] = useState(null);

  const handleEditOrg = (org: MyOrganization) => {
    setOrgUnderEdit(org);
    setEditOrgFormOpen(true);
  };

  const organizations = data?.allOrganizations;
  const requests = allRegistrationRequests?.allRegistrationRequests;

  return (
    <AdminsOnly
      title={t("pages.orgs.title")}
      description={t("pages.orgs.description_long")}
      onlySuperAdmin
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
          <Collapsible title="Rekisteröitymispyynnöt" defaultOpen>
            {requests?.length === 0 ? (
              <p>Ei rekisteröitymispyyntöjä</p>
            ) : (
              <ul>
                {requests?.map((r) => (
                  <li key={r.id} className="ml-10 list-disc">
                    {r.lastName} {r.firstName} {r.email} | {r.orgName} |{" "}
                    {r.municipality.name} | {r.industry.nameFi} | {r.businessID}
                  </li>
                ))}
              </ul>
            )}
          </Collapsible>
          <Collapsible title="Yritykset">
            <OrganizationsTable
              handleFormOpen={handleEditOrg}
              organizations={organizations}
              t={t}
            />
          </Collapsible>
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
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="mb-4 overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
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
