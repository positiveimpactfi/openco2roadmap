import { registerEnumType } from "type-graphql";
import { MeasurementUnitType } from "../../../shared/types/MeasurementUnitType";

registerEnumType(MeasurementUnitType, {
  name: "MeasurementUnitType",
  description: "Units of physical quantities",
});
