import { BusinessFieldResolver } from "./resolvers/businessField";
import { UserResolver } from "./resolvers/user";
import { OrganizationResolver } from "./resolvers/organization";
import { CategoryResolver } from "./resolvers/category";
import { ComponentResolver } from "./resolvers/component";
import { MeasurementUnitResolver } from "./resolvers/measurementUnit";
import { PhysicalQuantityResolver } from "./resolvers/physicalQuantity";
import { MunicipalityResolver } from "./resolvers/municipality";

export const resolvers = [
  UserResolver,
  OrganizationResolver,
  BusinessFieldResolver,
  CategoryResolver,
  ComponentResolver,
  MeasurementUnitResolver,
  PhysicalQuantityResolver,
  MunicipalityResolver,
] as const;
