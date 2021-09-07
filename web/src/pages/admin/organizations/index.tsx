import AdminsOnly from "components/Admin/AdminsOnly";
import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import NewOrganizationForm from "components/Forms/Organization/NewOrganizationForm";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { Organization, useAllOrganizationsQuery } from "generated/graphql";
import { useState } from "react";

const Organizations = () => {
  const { data, loading } = useAllOrganizationsQuery();
  const [editOrgFormOpen, setEditOrgFormOpen] = useState(false);
  const [newOrgFormOpen, setNewOrgFormOpen] = useState(false);
  const [orgUnderEdit, setOrgUnderEdit] = useState(null);

  const handleEditOrg = (org: MyOrganization) => {
    setOrgUnderEdit(org);
    setEditOrgFormOpen(true);
  };

  if (loading) return <div>ladataan...</div>;
  if (!data.allOrganizations) return <div>jotain meni pieleen</div>;

  return (
    <AdminsOnly
      title="Yritykset"
      description="Tällä sivulla voit tarkastella ja muokata kaikkia laskurista löytyviä yrityksiä."
    >
      {loading ? (
        <div> Ladataan...</div>
      ) : (
        <>
          <SlideOver
            title="Lisää yritys"
            open={newOrgFormOpen}
            setOpen={setNewOrgFormOpen}
          >
            <NewOrganizationForm setSlideoverOpen={setNewOrgFormOpen} />
          </SlideOver>
          <SlideOver
            title="Muokkaa yritystä"
            open={editOrgFormOpen}
            setOpen={setEditOrgFormOpen}
          >
            <EditOrganizationForm
              org={orgUnderEdit}
              setSlideoverOpen={setEditOrgFormOpen}
            />
          </SlideOver>
          <button
            type="button"
            className="px-2 py-2 mb-4 bg-teal-600 inline-flex items-center justify-center text-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => setNewOrgFormOpen(true)}
          >
            Uusi yritys
          </button>
          <OrganizationsTable
            handleFormOpen={handleEditOrg}
            organizations={data.allOrganizations}
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
}

const OrganizationsTable: React.FC<OrgTableProps> = ({
  handleFormOpen,
  organizations,
}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <Table
              headers={[
                "Yrityksen nimi",
                "Y-tunnus",
                "Kotikunta",
                "Toimiala",
                "Luotu",
                "Kirjautunut",
                "Muokkaa",
              ]}
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

export default Organizations;
