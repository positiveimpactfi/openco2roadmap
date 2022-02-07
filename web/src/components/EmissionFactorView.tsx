import { useState } from "react";
import { EmissionFactor, EmissionFactorValue } from "types/generatedTypes";
import { classNames } from "utils/classNames";
import Button from "./Button";
import CreateEmissionFactorValueForm from "./Forms/Emissions/CreateEmissionFactorValue";

const EmissionFactorView: React.FC<{
  ef: EmissionFactor;
  onClose: (val: boolean) => void;
}> = ({ ef, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [newValues, setNewValues] = useState<EmissionFactorValue[]>([]);

  const handleNewValue = (newValue: EmissionFactorValue) => {
    setNewValues([...newValues].concat(newValue));
    setShowForm(false);
  };

  return (
    <div>
      <h1 className="mb-2 text-lg font-medium text-gray-900">{ef.name}</h1>
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-gray-700">
          Päästökertoimen nimi:
        </p>
        <p className="px-3 py-1 text-sm text-gray-900">{ef.name}</p>
      </div>
      <div className="mt-2">
        <p className="mb-2 text-sm font-medium text-gray-700">
          Alueellinen kattavuus:
        </p>
        <p className="px-3 py-1 text-sm text-gray-900">{ef.geographicalArea}</p>
      </div>
      <div className="mt-2">
        <p className="mb-2 text-sm font-medium text-gray-700">Lähde:</p>
        <p className="px-3 py-1 text-sm text-gray-900">{ef.source}</p>
      </div>
      <div className="mt-2">
        <p className="mb-2 text-sm font-medium text-gray-700">Mittayksikkö:</p>
        <p className="px-3 py-1 text-sm text-gray-900">
          kg CO2e / {ef.physicalQuantity.baseUnit.shorthand}
        </p>
      </div>

      <br />
      <EmissionFactorValueCards emissionFactor={ef} newValues={newValues} />
      {!showForm && (
        <div className="mt-8 flex justify-end gap-x-2">
          <Button onClick={() => setShowForm(true)}>Lisää uusi arvo</Button>
          <Button variant="success" onClick={() => onClose(false)}>
            Sulje
          </Button>
        </div>
      )}
      {showForm && (
        <CreateEmissionFactorValueForm
          onClose={setShowForm}
          onSuccess={handleNewValue}
          emissionFactor={ef}
        />
      )}
    </div>
  );
};

const EmissionFactorValueCards: React.FC<{
  emissionFactor: EmissionFactor;
  newValues: EmissionFactorValue[];
}> = ({ emissionFactor, newValues }) => {
  const allValues = newValues
    .concat(emissionFactor.values)
    .sort((a, b) => b.startDate - a.startDate);
  return (
    <>
      <h2 className="text-xs font-medium uppercase text-gray-700">
        Päästökertoimen arvot
      </h2>
      <ul role="list" className="mt-3 flex flex-wrap gap-5 sm:gap-6">
        {allValues.map((ev) => (
          <li
            key={ev.id}
            className="col-span-1 flex w-full rounded-md shadow-sm"
          >
            <div
              className={classNames(
                "bg-gray-500",
                "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
              )}
            >
              {ev.startDate}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="font-medium text-gray-900 hover:text-gray-600">
                  {ev.value.toLocaleString("fi")} kg CO2e /{" "}
                  {emissionFactor.physicalQuantity.baseUnit.shorthand}
                </p>
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
