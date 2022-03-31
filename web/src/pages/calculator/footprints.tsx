import { emissionCategories } from "@/shared/categories";
import { withAuth } from "components/Auth";
import CalculatorPanel from "components/CalculatorPanel";
import ChartGroup from "components/Charts/ChartGroup";
import LoadingBar from "components/LoadingBar";
import Table, { TableCell } from "components/Tables/SimpleTable";
import { useMyOrganizationEmissionsByCategoryAndMonthQuery } from "graphql/queries/emissions/myOrganizationEmissionsByCategoryAndMonth.generated";
import { useMyOrganizationEmissionsByCategoryAndYearQuery } from "graphql/queries/emissions/myOrganizationEmissionsByCategoryAndYear.generated";
import { useEmissionsByKpiQuery } from "graphql/queries/kpi/emissionsByKPI.generated";
import useTranslation from "next-translate/useTranslation";
import { numberToString } from "utils/numberToString";

const CalculatorFootprintsPage = () => {
  const { t } = useTranslation("calculator");
  const { data, loading } = useMyOrganizationEmissionsByCategoryAndYearQuery({
    fetchPolicy: "network-only",
  });
  const { data: monthlyData } =
    useMyOrganizationEmissionsByCategoryAndMonthQuery();
  const components = data?.myOrganizationEmissionsByCategoryAndYear?.map(
    (c) => {
      return {
        id: c.categoryid,
        name: emissionCategories.find(
          (category) => category.id === parseInt(c.categoryid)
        ).name,
        years: JSON.parse(c.yearlysums),
      };
    }
  );
  const monthlyComponents =
    monthlyData?.myOrganizationEmissionsByCategoryAndMonth?.map((c) => {
      return {
        id: c.categoryid,
        name: emissionCategories.find(
          (category) => category.id === parseInt(c.categoryid)
        ).name,
        year: c.year,
        months: JSON.parse(c.monthlysums),
      };
    });
  const allYears = components?.map((c) => c.years) as {
    [key: number]: number;
  }[];
  const allYearsParsed = allYears
    ?.reduce<number[]>((previous, current) => {
      const ke = Object.keys(current)
        .map((k) => parseInt(k))
        .flat();
      const prevCopy = [...previous];
      for (let k of ke) {
        if (!previous.includes(k)) {
          prevCopy.push(k);
        }
      }
      return prevCopy;
    }, [])
    .sort();
  const allParsedString = allYearsParsed?.map((y) => y.toString());

  return (
    <CalculatorPanel
      title={t("pages.footprints.title")}
      description={t("pages.footprints.description")}
    >
      {loading ? (
        <LoadingBar />
      ) : allYearsParsed ? (
        <div className="flex flex-col">
          <ChartGroup
            yearlyData={components}
            years={allYearsParsed}
            monthlyData={monthlyComponents}
          />
          <div className="mt-16 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Table
                headers={(
                  t(
                    "pages.footprints.table.headers",
                    {},
                    { returnObjects: true }
                  ) as string[]
                ).concat(allParsedString)}
              >
                {components?.map((c, i) => (
                  <tr key={c.id}>
                    <TableCell
                      key={c.id.toString() + i.toString()}
                      value={c.name}
                    />
                    {allYearsParsed.map((y) => (
                      <TableCell
                        key={c.id.toString() + y.toString()}
                        value={numberToString(allYears[i][y] / 1000, 1)}
                        clamped
                      />
                    ))}
                  </tr>
                ))}
                <tr>
                  <TableCell value="Yhteensä, t CO2e" bolded />
                  {allYearsParsed.map((y) => (
                    <TableCell
                      key={y + "_total"}
                      value={numberToString(
                        allYears.reduce((p, c) => (c[y] ? p + c[y] : p), 0) /
                          1000,
                        1
                      )}
                      clamped
                      bolded
                    />
                  ))}
                </tr>
              </Table>
            </div>
          </div>
          <KPITable />
        </div>
      ) : null}
    </CalculatorPanel>
  );
};

const KPITable = () => {
  interface ReducedData {
    kpi: string;
    values: {
      year: number;
      value: number;
    }[];
  }

  const { data, loading } = useEmissionsByKpiQuery({
    fetchPolicy: "network-only",
  });
  const myData = data?.emissionsByKPI;
  const kpiValuesByYear = myData?.reduce((acc, current) => {
    const alreadyInArray = acc.find((v) => v.kpi === current.kpi);
    if (!alreadyInArray) {
      return acc.concat({
        kpi: current.kpi,
        values: [{ year: current.year, value: current.kpiValue }],
      });
    } else {
      const newData = { year: current.year, value: current.kpiValue };
      const newAcc = acc.map((v) => {
        if (v.kpi !== current.kpi) return v;
        else return { ...v, values: v.values.concat(newData) };
      });
      return newAcc;
    }
  }, [] as ReducedData[]);
  const allYears = myData?.reduce((acc, current) => {
    if (!acc.includes(current.year)) {
      return acc.concat(current.year);
    } else return acc;
  }, [] as number[]);
  const sortedKPIValuesByYear = kpiValuesByYear?.sort((a, b) =>
    a.kpi.localeCompare(b.kpi)
  );
  if (loading) return <div>loading...</div>;
  if (myData.length === 0) return null;
  return (
    <div className="mt-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <Table
          headers={["Hiilijalanjäljen tunnusluvut"].concat(
            allYears.map((y) => y.toString())
          )}
        >
          {sortedKPIValuesByYear?.map((kpi, i) => (
            <tr key={kpi.kpi}>
              <TableCell
                key={kpi.kpi + i.toString()}
                value={`Hiilijalanjälki per ${kpi.kpi.toLowerCase()}`}
              />
              {allYears.map((y) => (
                <TableCell
                  key={kpi.kpi + y.toString()}
                  value={numberToString(
                    kpi.values.find((v) => v.year === y)?.value,
                    2
                  )}
                  clamped
                />
              ))}
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default withAuth(CalculatorFootprintsPage);
