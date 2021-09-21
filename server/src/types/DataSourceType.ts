import { registerEnumType } from "type-graphql";
import { DataSourceType } from "../../../shared/types/DataSourceType";

registerEnumType(DataSourceType, {
  name: "DataSourceType",
  description: "Origin of the data",
});
