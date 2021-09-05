import { BusinessFieldResolver } from "./resolvers/businessField";
import { UserResolver } from "./resolvers/user";
import { OrganizationResolver } from "./resolvers/organization";
import { CategoryResolver } from "./resolvers/category";
import { ComponentResolver } from "./resolvers/component";
import { MeasurementUnitResolver } from "./resolvers/measurementUnit";
import { PhysicalQuantityResolver } from "./resolvers/physicalQuantity";
import { MunicipalityResolver } from "./resolvers/municipality";
import { SiteTypeResolver } from "./resolvers/siteType";
import { SiteResolver } from "./resolvers/site";
import { SiteUnitResolver } from "./resolvers/siteUnit";
import { EmissionSourceResolver } from "./resolvers/emissionSource";
import { EmissionFactorResolver } from "./resolvers/emissionFactor";
import { EmissionFactorValueResolver } from "./resolvers/emissionFactorValue";

export const resolvers = [
  UserResolver,
  OrganizationResolver,
  BusinessFieldResolver,
  CategoryResolver,
  ComponentResolver,
  MeasurementUnitResolver,
  PhysicalQuantityResolver,
  MunicipalityResolver,
  SiteTypeResolver,
  SiteResolver,
  SiteUnitResolver,
  EmissionSourceResolver,
  EmissionFactorResolver,
  EmissionFactorValueResolver,
] as const;
