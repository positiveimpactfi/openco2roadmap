import { registerEnumType } from "type-graphql";

export enum DataSourceType {
  Primary,
  Secondary,
  Tertiary,
}

registerEnumType(DataSourceType, {
  name: "DataSourceType",
  description: "Origin of the data",
});
