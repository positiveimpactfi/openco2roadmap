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
      <Table headers={["Tunnusluku"].concat(allYears)}>
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
              </tr>
            );
          } else return null;
        })}
      </Table>
    </SettingsPanel>
  );
};

export default withAuth(KPISettingsPage);
