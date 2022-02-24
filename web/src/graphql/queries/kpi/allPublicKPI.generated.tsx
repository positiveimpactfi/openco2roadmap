import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllPublicKpiQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllPublicKpiQuery = { __typename?: 'Query', publicKPIs: Array<{ __typename?: 'KPI', id: string, name: string }> };


export const AllPublicKpiDocument = gql`
    query AllPublicKPI {
  publicKPIs {
    id
    name
  }
}
    `;

/**
 * __useAllPublicKpiQuery__
 *
 * To run a query within a React component, call `useAllPublicKpiQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPublicKpiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPublicKpiQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPublicKpiQuery(baseOptions?: Apollo.QueryHookOptions<AllPublicKpiQuery, AllPublicKpiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPublicKpiQuery, AllPublicKpiQueryVariables>(AllPublicKpiDocument, options);
      }
export function useAllPublicKpiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPublicKpiQuery, AllPublicKpiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPublicKpiQuery, AllPublicKpiQueryVariables>(AllPublicKpiDocument, options);
        }
export type AllPublicKpiQueryHookResult = ReturnType<typeof useAllPublicKpiQuery>;
export type AllPublicKpiLazyQueryHookResult = ReturnType<typeof useAllPublicKpiLazyQuery>;
export type AllPublicKpiQueryResult = Apollo.QueryResult<AllPublicKpiQuery, AllPublicKpiQueryVariables>;