import { EmissionFactor } from "types/generatedTypes";

const EmissionFactorView: React.FC<{ ef: EmissionFactor }> = ({ ef }) => {
  return (
    <div>
      <div>{ef.name}</div>
      <div>Alueellinen kattavuus: {ef.geographicalArea}</div>
      <div>Lähde: {ef.source}</div>
      <div>Mittayksikkö: kg CO2e/{ef.physicalQuantity.baseUnit.shorthand}</div>
      <br />
      <div>Päästökertoimien arvot</div>
      <ul>
        {ef.values?.map((value) => (
          <li key={value.id}>
            {value.startDate}: {value.value} kg CO2e/
            {ef.physicalQuantity.baseUnit.shorthand}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmissionFactorView;
