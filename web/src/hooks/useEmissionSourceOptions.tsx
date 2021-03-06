import { useAllCategoriesQuery } from "graphql/queries/emissions/allCategories.generated";
import { categoriesInOrder } from "pages/settings/emission-sources";

export interface SourceOption {
  children: {
    children: {
      __typename?: "EmissionSource";
      name: string;
      id: number;
      categoryID: number;
    }[];
    categoryID: number;
    __typename?: "Component";
    name: string;
    id: number;
    emissionSources?: {
      __typename?: "EmissionSource";
      name: string;
      id: number;
    }[];
  }[];
  __typename?: "Category";
  name: string;
  id: number;
  components: {
    __typename?: "Component";
    name: string;
    id: number;
    emissionSources?: {
      __typename?: "EmissionSource";
      name: string;
      id: number;
    }[];
  }[];
}

export const useEmissionSourceOptions = () => {
  const { data: sources, loading } = useAllCategoriesQuery();

  const sourceOptions: SourceOption[] = sources?.allCategories.map((cat) => {
    return {
      ...cat,
      children: cat.components.map((comp) => {
        return {
          ...comp,
          children: comp.emissionSources.map((es) => {
            return { ...es, categoryID: cat.id };
          }),
          categoryID: cat.id,
        };
      }),
    };
  });
  const sortedSourceOptions = sourceOptions?.sort((a, b) => {
    const ai = categoriesInOrder.findIndex((c) => c.name === a.name);
    const bi = categoriesInOrder.findIndex((c) => c.name === b.name);
    return ai - bi;
  });
  return { sourceOptions, sortedSourceOptions, sources, loading };
};
