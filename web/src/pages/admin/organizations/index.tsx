import { DotsVerticalIcon } from "@heroicons/react/solid";
import AdminsOnly from "components/Admin/AdminsOnly";
import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import NewOrganizationForm from "components/Forms/Organization/NewOrganizationForm";
import SlideOver from "components/SlideOver";
import { Organization, useOrganizationsQuery } from "generated/graphql";
import { useState } from "react";

const Organizations = () => {
  const { loading } = useOrganizationsQuery();
  const [editOrgFormOpen, setEditOrgFormOpen] = useState(false);
  const [newOrgFormOpen, setNewOrgFormOpen] = useState(false);
  const [orgUnderEdit, setOrgUnderEdit] = useState(null);

  const handleEditOrg = (org: MyOrganization) => {
    setOrgUnderEdit(org);
    setEditOrgFormOpen(true);
  };
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
            <EditOrganizationForm org={orgUnderEdit} />
          </SlideOver>
          <button
            type="button"
            className="px-2 py-2 mb-4 bg-teal-600 inline-flex items-center justify-center text-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => setNewOrgFormOpen(true)}
          >
            Uusi yritys
          </button>
          <OrganizationsTable handleFormOpen={handleEditOrg} />
        </>
      )}
    </AdminsOnly>
  );
};

export type MyOrganization = Partial<Organization>;
const OrganizationsTable: React.FC<{
  handleFormOpen: (org: MyOrganization) => void;
}> = ({ handleFormOpen }) => {
  const org: MyOrganization = {
    id: "1",
    name: "Matkailuyritys Oy",
    businessID: "XXXXXX-X",
    municipality: "Helsinki",
    businessField: {
      name: "Ohjelmapalvelut",
      id: 1,
    },
  };
  const organizations: MyOrganization[] = Array(20)
    .fill(org)
    .map((org, i) => {
      return { ...org, id: org.id + i };
    });

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Yrityksen nimi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Y-tunnus
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kotikunta
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Toimiala
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Luotu
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kirjautunut
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Muokkaa
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {organizations.map((org) => (
                  <tr key={org.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {org.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org.businessID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org.municipality}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org.businessField.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      10.10.2020
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Date().toString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={() => handleFormOpen(org)}
                      >
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon
                          className="w-5 h-5"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organizations;
