import { emissionCategories } from "@/shared/categories";
import { withAuth } from "components/Auth";
import CalculatorPanel from "components/CalculatorPanel";
import LoadingBar from "components/LoadingBar";
import Table, { TableCell } from "components/Tables/SimpleTable";
import { useMyOrganizationEmissionsByCategoryAndYearQuery } from "graphql/queries/emissions/myOrganizationEmissionsByCategoryAndYear.generated";
import useTranslation from "next-translate/useTranslation";
import { numberToString } from "utils/numberToString";

const CalculatorFootprintsPage = () => {
  const { t } = useTranslation("calculator");
  const { data, loading } = useMyOrganizationEmissionsByCategoryAndYearQuery({
    fetchPolicy: "network-only",
  });
  const components = data?.myOrganizationEmissionsByCategoryAndYear;
  const allYears = components?.map((c) => JSON.parse(c.yearlysums)) as {
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
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                  <tr key={c.categoryid}>
                    <TableCell
                      key={c.categoryid.toString() + i.toString()}
                      value={
                        emissionCategories.find(
                          (category) => category.id === parseInt(c.categoryid)
                        ).name
                      }
                    />
                    {allYearsParsed.map((y) => (
                      <TableCell
                        key={c.categoryid.toString() + y.toString()}
                        value={numberToString(allYears[i][y] / 1000, 1)}
                        clamped
                      />
                    ))}
                  </tr>
                ))}
                <tr className="h-2" />
                <tr>
                  <TableCell value="Hiilijalanjälki yhteensä" />
                  {allYearsParsed.map((y) => (
                    <TableCell
                      key={y + "_total"}
                      value={numberToString(
                        allYears.reduce((p, c) => (c[y] ? p + c[y] : p), 0) /
                          1000,
                        1
                      )}
                      clamped
                    />
                  ))}
                </tr>
              </Table>
            </div>
          </div>
        </div>
      ) : null}
    </CalculatorPanel>
  );
};

export default withAuth(CalculatorFootprintsPage);
