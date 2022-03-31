import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type EmissionsByKpiQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EmissionsByKpiQuery = { __typename?: 'Query', emissionsByKPI: Array<{ __typename?: 'EmissionsByKPI', year: number, kpi: string, kpiValue: number }> };


export const EmissionsByKpiDocument = gql`
    query EmissionsByKPI {
  emissionsByKPI {
    year
    kpi
    kpiValue
  }
}
    `;

/**
 * __useEmissionsByKpiQuery__
 *
 * To run a query within a React component, call `useEmissionsByKpiQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmissionsByKpiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmissionsByKpiQuery({
 *   variables: {
 *   },
 * });
 */
export function useEmissionsByKpiQuery(baseOptions?: Apollo.QueryHookOptions<EmissionsByKpiQuery, EmissionsByKpiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmissionsByKpiQuery, EmissionsByKpiQueryVariables>(EmissionsByKpiDocument, options);
      }
export function useEmissionsByKpiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmissionsByKpiQuery, EmissionsByKpiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmissionsByKpiQuery, EmissionsByKpiQueryVariables>(EmissionsByKpiDocument, options);
        }
export type EmissionsByKpiQueryHookResult = ReturnType<typeof useEmissionsByKpiQuery>;
export type EmissionsByKpiLazyQueryHookResult = ReturnType<typeof useEmissionsByKpiLazyQuery>;
export type EmissionsByKpiQueryResult = Apollo.QueryResult<EmissionsByKpiQuery, EmissionsByKpiQueryVariables>;