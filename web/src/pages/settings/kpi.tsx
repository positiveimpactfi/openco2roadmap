import { withAuth } from "components/Auth";
import Button from "components/Button";
import CreateKPIForm from "components/Forms/KPI/CreateKPIForm";
import EditKPIForm from "components/Forms/KPI/EditKPIForm";
import OptionsMenu from "components/OptionsMenu";
import SettingsPanel from "components/SettingsPanel";
import SlideOver from "components/SlideOver";
import Table, { TableCell } from "components/Tables/SimpleTable";
import WarningModal from "components/Warning";
import { useDeleteKpiMutation } from "graphql/mutations/kpi/deleteKPI.generated";
import { useAllPublicKpiQuery } from "graphql/queries/kpi/allPublicKPI.generated";
import {
  MyOrganizationKpiValuesDocument,
  useMyOrganizationKpiValuesQuery,
} from "graphql/queries/kpi/myOrganizationKPIs.generated";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Kpi } from "types/generatedTypes";
import { numberToString } from "utils/numberToString";

const KPISettingsPage = () => {
  const { t } = useTranslation("settings");
  const [deleteKPI] = useDeleteKpiMutation();
  const { data: publicKPI } = useAllPublicKpiQuery();
  const { data } = useMyOrganizationKpiValuesQuery();
  const kpis = publicKPI?.publicKPIs;
  const myKpis = data?.myOrganizationKPIs;
  const [newKPIformOpen, setNewKPIFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);

  useEffect(() => {
    if (!selectedKPI) return;
    else {
      // check if selectedKPI is in my org KPIs
      if (myKpis.find((k) => k.id === selectedKPI.id)) {
        setSelectedKPI(myKpis.find((k) => k.id === selectedKPI.id));
      } else if (kpis.find((k) => k.id === selectedKPI.id)) {
        setSelectedKPI(kpis.find((k) => k.id === selectedKPI.id));
      }
    }
  }, [kpis, myKpis, selectedKPI]);

  const handleSelectKPI = (kpi: Kpi) => {
    setSelectedKPI(kpi);
    setWarningOpen(true);
  };

  const handleEditKPI = (kpi: Kpi) => {
    setSelectedKPI(kpi);
    setEditFormOpen(true);
  };

  const handleDelete = async (kpi: Kpi) => {
    if (kpi?.id) {
      const res = await deleteKPI({
        variables: { id: kpi.id },
        refetchQueries: [MyOrganizationKpiValuesDocument],
      });
      if (res.data?.deleteKPI?.name) {
        console.log("successfully deleted KPI");
        setSelectedKPI(null);
      }
    }
    setWarningOpen(false);
  };

  const allYears = myKpis
    ?.reduce((acc, current) => {
      let newEntries = [];
      for (let value of current.values) {
        if (!acc.includes(value.year.toString()))
          newEntries.push(value.year.toString());
      }
      return acc.concat(newEntries);
    }, [])
    .sort();

  const allKPIs = myKpis?.reduce((acc, current) => {
    if (!acc.map((a) => a.name).includes(current.name)) {
      return acc.concat(current);
    }
    return acc;
  }, []);

  return (
    <SettingsPanel
      title={t("pages.kpis.title")}
      description={t("pages.kpis.description_long")}
    >
      <WarningModal
        open={warningOpen}
        setOpen={setWarningOpen}
        title="Poistetaanko tunnusluku?"
        description="Oletko varma, että valitsemasi tunnusluku ja kaikki sen arvot voi poistaa? Tätä toimenpidettä ei voi perua."
        onConfirm={async () => await handleDelete(selectedKPI)}
      />
      <div className="mb-4">
        <Button variant="success" onClick={() => setNewKPIFormOpen(true)}>
          Lisää uusi tunnusluku
        </Button>
      </div>
      <SlideOver
        title="Lisätään uusi tunnusluku"
        open={newKPIformOpen}
        setOpen={setNewKPIFormOpen}
      >
        <CreateKPIForm setOpen={setNewKPIFormOpen} />
      </SlideOver>
      <SlideOver
        title="Muokataan tietoja"
        open={editFormOpen}
        setOpen={setEditFormOpen}
      >
        <EditKPIForm kpi={selectedKPI} setOpen={setEditFormOpen} />
      </SlideOver>
      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
        <Table
          headers={["Tunnusluku"].concat(allYears).concat("Muokkaa")}
          alignLastRight
        >
          {allKPIs?.map((kpi, i) => (
            <tr key={kpi.id.toString() + i.toString()}>
              <TableCell value={kpi.name} />
              {allYears?.map((y) => {
                let value = "-";
                const hasEntry = allKPIs.map((a) => a.name).includes(kpi.name);
                if (hasEntry) {
                  const foundKpi = myKpis.find((k) => k.name === kpi.name);
                  const kpiValue = foundKpi?.values?.find(
                    (v) => v.year.toString() === y
                  )?.value;
                  const kpiUnit = foundKpi?.unit?.shorthand;
                  value =
                    kpiUnit && kpiValue
                      ? numberToString(kpiValue) + " " + kpiUnit
                      : numberToString(kpiValue);
                }
                return (
                  <TableCell
                    key={kpi.id.toString() + "-year-" + y.toString()}
                    value={value}
                    clamped
                  />
                );
              })}
              <div className="flex justify-end px-4">
                {kpi.organization ? (
                  <OptionsMenu
                    onEdit={() => handleEditKPI(kpi)}
                    onDelete={() => handleSelectKPI(kpi)}
                  />
                ) : (
                  <OptionsMenu onEdit={() => handleEditKPI(kpi)} />
                )}
              </div>
            </tr>
          ))}
          {kpis?.map((kpi, i) => {
            if (!allKPIs?.map((k) => k.id).includes(kpi.id)) {
              return (
                <tr key={kpi.id + "-no-data" + i}>
                  <TableCell value={kpi.name} />
                  {allYears?.map((y) => (
                    <TableCell
                      key={"no-data-cell-" + kpi.id + "-" + y}
                      value="-"
                      clamped
                    />
                  ))}
                  <td className="flex items-center justify-end px-4 py-1">
                    <OptionsMenu
                      onEdit={() => handleEditKPI(kpi as Kpi)}
                      variant={
                        i >= allKPIs?.length - 2 ? "last-element" : "normal"
                      }
                    />
                  </td>
                </tr>
              );
            } else return null;
          })}
        </Table>
      </div>
    </SettingsPanel>
  );
};

export default withAuth(KPISettingsPage);
