import { EmissionFactor } from "types/generatedTypes";
import { classNames } from "utils/classNames";

const EmissionFactorView: React.FC<{ ef: EmissionFactor }> = ({ ef }) => {
  return (
    <div>
      <h1 className="text-lg font-medium text-gray-900 mb-2">{ef.name}</h1>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Päästökertoimen nimi:
        </p>
        <p className="px-3 py-1 text-gray-900 text-sm">{ef.name}</p>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Alueellinen kattavuus:
        </p>
        <p className="px-3 py-1 text-gray-900 text-sm">{ef.geographicalArea}</p>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-700 mb-2">Lähde:</p>
        <p className="px-3 py-1 text-gray-900 text-sm">{ef.source}</p>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-700 mb-2">Mittayksikkö:</p>
        <p className="px-3 py-1 text-gray-900 text-sm">
          kg CO2e / {ef.physicalQuantity.baseUnit.shorthand}
        </p>
      </div>

      <br />
      <EmissionFactorValueCards emissionFactor={ef} />
    </div>
  );
};

const EmissionFactorValueCards: React.FC<{
  emissionFactor: EmissionFactor;
}> = ({ emissionFactor }) => {
  return (
    <>
      <h2 className="text-xs font-medium uppercase text-gray-700">
        Päästökertoimen arvot
      </h2>
      <ul role="list" className="mt-3 flex flex-wrap gap-5 sm:gap-6">
        {emissionFactor.values?.map((ev) => (
          <li
            key={ev.id}
            className="col-span-1 flex shadow-sm rounded-md w-full"
          >
            <div
              className={classNames(
                "bg-gray-500",
                "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
              )}
            >
              {ev.startDate}
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a
                  href={"#"}
                  className="text-gray-900 font-medium hover:text-gray-600"
                >
                  {ev.value} kg CO2e /{" "}
                  {emissionFactor.physicalQuantity.baseUnit.shorthand}
                </a>
                <p className="text-gray-500">
                  1.1.{ev.startDate} - 31.12.{ev.endDate}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EmissionFactorView;
