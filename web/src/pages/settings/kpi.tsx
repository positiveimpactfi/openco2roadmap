import { withAuth } from "components/Auth";
import SettingsPanel from "components/SettingsPanel";
import useTranslation from "next-translate/useTranslation";
import { useMyOrganizationKpiValuesQuery } from "graphql/queries/kpi/myOrganizationKPIs.generated";
import { useAllPublicKpiQuery } from "graphql/queries/kpi/allPublicKPI.generated";
import Table, { TableCell } from "components/Tables/SimpleTable";
import { numberToString } from "utils/numberToString";

const KPISettingsPage = () => {
  const { t } = useTranslation("settings");
  const { data: publicKPI } = useAllPublicKpiQuery();
  const { data } = useMyOrganizationKpiValuesQuery();
  const kpis = publicKPI?.publicKPIs;
  const myKpis = data?.myOrganizationKPIs;

  const allYears = myKpis?.reduce((acc, current) => {
    const newEntries = [];
    for (let value of current.values) {
      if (!acc.includes(value.year)) newEntries.push(value.year.toString());
    }
    return acc.concat(newEntries);
  }, []);

  const allCategories = myKpis?.reduce((acc, current) => {
    if (!acc.includes(current.name)) {
      return acc.concat(current.name);
    }
    return acc;
  }, []);

  return (
    <SettingsPanel
      title={t("pages.kpis.title")}
      description={t("pages.kpis.description_long")}
    >
      <Table headers={["Tunnusluku"].concat(allYears)}>
        {kpis?.map((kpi, i) => (
          <tr key={kpi.id}>
            <TableCell
              key={kpi.id.toString() + i.toString()}
              value={kpi.name}
            />
            {allYears?.map((y) => {
              let value = "-";
              const hasEntry = allCategories.includes(kpi.name);
              if (hasEntry) {
                const foundKpi = myKpis.find((k) => k.name === kpi.name);
                const kpiValue = foundKpi?.values?.find(
                  (v) => v.year.toString() === y
                )?.value;
                const kpiUnit = foundKpi?.unit?.shorthand;
                value = numberToString(kpiValue) + " " + kpiUnit;
              }
              return (
                <TableCell
                  key={kpi.id.toString() + y.toString()}
                  value={value}
                  clamped
                />
              );
            })}
          </tr>
        ))}
      </Table>
    </SettingsPanel>
  );
};

export default withAuth(KPISettingsPage);
