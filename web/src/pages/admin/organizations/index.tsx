import { DotsVerticalIcon } from "@heroicons/react/solid";
import AdminsOnly from "components/Admin/AdminsOnly";
import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import NewOrganizationForm from "components/Forms/Organization/NewOrganizationForm";
import SlideOver from "components/SlideOver";
import { useOrganizationsQuery } from "generated/graphql";
import { Dispatch, SetStateAction, useState } from "react";

const Organizations = () => {
  const { loading } = useOrganizationsQuery();
  const [editOrgFormOpen, setEditOrgFormOpen] = useState(false);
  const [newOrgFormOpen, setNewOrgFormOpen] = useState(false);
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
            <EditOrganizationForm />
          </SlideOver>
          <button
            type="button"
            className="px-2 py-2 mb-4 bg-teal-600 inline-flex items-center justify-center text-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => setNewOrgFormOpen(true)}
          >
            Uusi yritys
          </button>
          <OrganizationsTable openSlideover={setEditOrgFormOpen} />
        </>
      )}
    </AdminsOnly>
  );
};

export interface Organization {
  id: number;
  name: string;
  businessId: string;
  city: string;
  destination: string;
  created: string;
  lastLoggedIn: string;
}

const OrganizationsTable: React.FC<{
  openSlideover: Dispatch<SetStateAction<boolean>>;
}> = ({ openSlideover }) => {
  const org: Organization = {
    id: 1,
    name: "Matkailuyritys Oy",
    businessId: "XXXXXX-X",
    city: "Helsinki",
    destination: "Uusimaa",
    created: "10.10.2020",
    lastLoggedIn: "17.08.2021",
  };
  const organizations: Organization[] = Array(20)
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
                    Destinaatio
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
                      {org.businessId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org.destination}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org.created}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org.lastLoggedIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => openSlideover(true)}
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
