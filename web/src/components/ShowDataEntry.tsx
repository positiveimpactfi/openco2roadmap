import { DataEntry } from "types/generatedTypes";
import { emissionSources } from "@/shared/emissionSources";
import { EmissionSourceType } from "@/shared/types/EmissionSourceType";
import { months } from "data/months";
import Button from "./Button";

const ShowDataEntry: React.FC<{
  dataEntry: DataEntry;
  setOpen?: (val: boolean) => void;
}> = ({ dataEntry: entry, setOpen }) => {
  return (
    <>
      <div className="space-y-4 rounded-md">
        <div className="">
          <label className={"mb-2 block text-sm font-medium text-gray-700"}>
            Toimipaikka
          </label>
          <span
            className={
              "relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
            }
          >
            {entry.siteUnit.name.startsWith("default_")
              ? entry.siteUnit.site.name
              : entry.siteUnit.name}
          </span>
        </div>
        <div>
          <div className="">
            <label className={"mb-2 block text-sm font-medium text-gray-700"}>
              Päästölähde
            </label>
            <span
              className={
                "relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
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
            <label className={"mb-2 block text-sm font-medium text-gray-700"}>
              Vuosi
            </label>
            <span
              className={
                "relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              }
            >
              {new Date(entry.startDate).getFullYear()}
            </span>
          </div>
          <div className="ml-2 w-2/3">
            <label className={"mb-2 block text-sm font-medium text-gray-700"}>
              Kuukausi
            </label>
            <span
              className={
                "relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
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
            <label className={"mb-2 block text-sm font-medium text-gray-700"}>
              Käytettävä päästökerroin
            </label>
            <span
              className={
                "relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              }
            >
              {entry.emissionFactorValue.emissionFactor.name}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">
            <label className={"mb-2 block text-sm font-medium text-gray-700"}>
              Kulutus
            </label>
            <span
              className={
                "relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              }
            >
              {entry.consumptionValue.toLocaleString()}
            </span>
          </div>
          <div className="ml-2 w-2/3">
            <label className={"mb-2 block text-sm font-medium text-gray-700"}>
              Mittayksikkö
            </label>
            <span
              className={
                "relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              }
            >
              {entry.measurementUnit}
            </span>
          </div>
        </div>
        {setOpen && (
          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)}>Sulje</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowDataEntry;
