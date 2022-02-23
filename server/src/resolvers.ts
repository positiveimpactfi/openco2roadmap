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
import { DataEntryResolver } from "./resolvers/dataEntry";
import { CalculationResultResolver } from "./resolvers/calculationResult";
import { RegistrationRequestResolver } from "./resolvers/registrationRequest";
import { KPIResolver } from "./resolvers/kpi";
import { KPIValueResolver } from "./resolvers/kpiValue";

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
  DataEntryResolver,
  CalculationResultResolver,
  RegistrationRequestResolver,
  KPIValueResolver,
  KPIResolver,
] as const;
