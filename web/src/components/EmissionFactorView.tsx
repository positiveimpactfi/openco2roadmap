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
      <EmissionFactorValueCards emissionFactor={ef} newValues={newValues} />
      {!showForm && (
        <div className="flex mt-8 justify-end gap-x-2">
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
                <p className="text-gray-900 font-medium hover:text-gray-600">
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
