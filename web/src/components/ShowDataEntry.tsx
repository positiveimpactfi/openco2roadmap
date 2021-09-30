import { DataEntry } from "types/generatedTypes";
import { emissionSources } from "@/shared/emissionSources";
import { EmissionSourceType } from "@/shared/types/EmissionSourceType";
import { months } from "data/months";

export type ReducedEF = {
  sourceNames: string[];
  sourceIds: number[];
  id: string;
  name: string;
  physicalQuantity: {
    __typename?: "PhysicalQuantity";
    name: string;
    baseUnit: {
      __typename?: "MeasurementUnit";
      name: string;
      shorthand: string;
    };
  };
  values: {
    __typename?: "EmissionFactorValue";
    id: string;
    value: number;
    startDate: number;
    endDate: number;
  }[];
};

const ShowDataEntry: React.FC<{
  dataEntry: DataEntry;
}> = ({ dataEntry: entry }) => {
  return (
    <>
      <div className="rounded-md space-y-4">
        <div className="">
          <label className={"block text-sm font-medium text-gray-700 mb-2"}>
            Toimipaikka
          </label>
          <span
            className={
              "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md"
            }
          >
            {entry.siteUnit.name.startsWith("default_")
              ? entry.siteUnit.site.name
              : entry.siteUnit.name}
          </span>
        </div>
        <div>
          <div className="">
            <label className={"block text-sm font-medium text-gray-700 mb-2"}>
              Päästölähde
            </label>
            <span
              className={
                "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md"
              }
            >
              {
                emissionSources.find(
                  (es) => es.id === EmissionSourceType[entry.emissionSource]
                ).name
              }
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">
            <label className={"block text-sm font-medium text-gray-700 mb-2"}>
              Vuosi
            </label>
            <span
              className={
                "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md"
              }
            >
              {new Date(entry.startDate).getFullYear()}
            </span>
          </div>
          <div className="w-2/3 ml-2">
            <label className={"block text-sm font-medium text-gray-700 mb-2"}>
              Kuukausi
            </label>
            <span
              className={
                "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md"
              }
            >
              {
                months.find(
                  (m) => m.id === new Date(entry.startDate).getMonth() + 1
                ).name
              }
            </span>
          </div>
        </div>

        <div>
          <div className="">
            <label className={"block text-sm font-medium text-gray-700 mb-2"}>
              Käytettävä päästökerroin
            </label>
            <span
              className={
                "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md"
              }
            >
              {entry.emissionFactorValue.emissionFactor.name}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">
            <label className={"block text-sm font-medium text-gray-700 mb-2"}>
              Kulutus
            </label>
            <span
              className={
                "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md"
              }
            >
              {entry.consumptionValue.toLocaleString()}
            </span>
          </div>
          <div className="w-2/3 ml-2">
            <label className={"block text-sm font-medium text-gray-700 mb-2"}>
              Mittayksikkö
            </label>
            <span
              className={
                "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md"
              }
            >
              {entry.measurementUnit}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDataEntry;
