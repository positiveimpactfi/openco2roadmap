import { CheckCircleIcon } from "@heroicons/react/solid";
import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import Collapsible from "components/Collapsible";
import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import NewOrganizationForm from "components/Forms/Organization/NewOrganizationForm";
import LoadingSpinner from "components/LoadingSpinner";
import SlideOver from "components/SlideOver";
import { Table, TableActionButton } from "components/Tables/Table";
import { useMarkRegistrationRequestProcessedMutation } from "graphql/mutations/organization/markRegistrationRequestProcessed.generated";
import {
  AllOrganizationsQuery,
  useAllOrganizationsQuery,
} from "graphql/queries/organization/allOrganizations.generated";
import {
  AllRegistrationRequestsDocument,
  useAllRegistrationRequestsQuery,
} from "graphql/queries/organization/allRegistrationRequests.generated";
import useTranslation from "next-translate/useTranslation";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { Organization, SubIndustry } from "types/generatedTypes";

const Organizations = () => {
  const { t } = useTranslation("admin");
  const { data, loading } = useAllOrganizationsQuery();
  const { data: allRegistrationRequests } = useAllRegistrationRequestsQuery({
    variables: { processed: false },
  });
  const [markDone] = useMarkRegistrationRequestProcessedMutation();
  const [editOrgFormOpen, setEditOrgFormOpen] = useState(false);
  const [newOrgFormOpen, setNewOrgFormOpen] = useState(false);
  const [orgUnderEdit, setOrgUnderEdit] = useState(null);

  const handleEditOrg = (org: MyOrganization) => {
    setOrgUnderEdit(org);
    setEditOrgFormOpen(true);
  };

  const handleRequestDone = async (id: string) => {
    const res = await markDone({
      variables: { id },
      refetchQueries: [AllRegistrationRequestsDocument],
    });
    if (!res.data?.markRequestProcessed?.id) {
      console.log("could not mark request done");
    } else {
      console.log("marked request done, id: ", id);
    }
  };

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
          <Collapsible title="Rekister??itymispyynn??t" defaultOpen>
            {requests?.length === 0 ? (
              <p>Ei rekister??itymispyynt??j??</p>
            ) : (
              <ul>
                {requests?.map((r) => (
                  <li key={r.id} className="ml-10 list-disc">
                    {r.lastName} {r.firstName} {r.email} | {r.orgName} |{" "}
                    {r.municipality.name} | {r.industry.nameFi} | {r.businessID}
                    <span className="ml-2">
                      <CheckCircleIcon
                        className="inline h-5 w-5 text-teal-500 hover:text-teal-800"
                        onClick={async () => handleRequestDone(r.id)}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Collapsible>
          <Collapsible title="Yritykset">
            <OrganizationsTable data={data} handleFormOpen={handleEditOrg} />
          </Collapsible>
        </>
      )}
    </AdminsOnly>
  );
};

export type MyOrganization = Partial<Organization> & {
  industry?: Partial<SubIndustry>;
};

interface TableProps {
  data: AllOrganizationsQuery;
  handleFormOpen: (org: MyOrganization) => void;
}

const OrganizationsTable = ({ data, handleFormOpen }: TableProps) => {
  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "Yrityksen nimi",
        accessor: "name",
      },
      {
        Header: "Y-tunnus",
        accessor: "businessID",
      },
      {
        Header: "Kotipaikka",
        accessor: "municipalityName",
        sortType: (rowA, rowB) =>
          (rowA.original as Organization).municipality?.name.localeCompare(
            (rowB.original as Organization).municipality?.name
          ),
      },
      {
        Header: "Toimiala",
        accessor: "industryName",
      },
      {
        Header: "Muokkaa",
        disableSortBy: true,
        Cell: ({ row }) => (
          <TableActionButton
            fn={() => {
              handleFormOpen(row.original as Organization);
            }}
          />
        ),
      },
    ],
    [handleFormOpen]
  );
  const tableData = useMemo(() => {
    let orgs = data?.allOrganizations ?? [];
    return orgs.map((org) => {
      return {
        ...org,
        industryName: org.industry
          ? `${org.industry.nameFi} (${org.industry.code})`
          : "Ei tiedossa",
        municipalityName: org.municipality?.name,
      };
    });
  }, [data]);
  return <Table columns={columns} data={tableData} />;
};

export default withAuth(Organizations);
