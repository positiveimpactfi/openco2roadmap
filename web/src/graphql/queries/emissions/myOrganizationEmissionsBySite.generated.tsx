import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyOrganizationEmissionsBySiteQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyOrganizationEmissionsBySiteQuery = { __typename?: 'Query', myOrganizationEmissionsBySite: Array<{ __typename?: 'SiteSummary', site: string, values: string }> };


export const MyOrganizationEmissionsBySiteDocument = gql`
    query MyOrganizationEmissionsBySite {
  myOrganizationEmissionsBySite {
    site
    values
  }
}
    `;

/**
 * __useMyOrganizationEmissionsBySiteQuery__
 *
 * To run a query within a React component, call `useMyOrganizationEmissionsBySiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationEmissionsBySiteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationEmissionsBySiteQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationEmissionsBySiteQuery(baseOptions?: Apollo.QueryHookOptions<MyOrganizationEmissionsBySiteQuery, MyOrganizationEmissionsBySiteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrganizationEmissionsBySiteQuery, MyOrganizationEmissionsBySiteQueryVariables>(MyOrganizationEmissionsBySiteDocument, options);
      }
export function useMyOrganizationEmissionsBySiteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrganizationEmissionsBySiteQuery, MyOrganizationEmissionsBySiteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrganizationEmissionsBySiteQuery, MyOrganizationEmissionsBySiteQueryVariables>(MyOrganizationEmissionsBySiteDocument, options);
        }
export type MyOrganizationEmissionsBySiteQueryHookResult = ReturnType<typeof useMyOrganizationEmissionsBySiteQuery>;
export type MyOrganizationEmissionsBySiteLazyQueryHookResult = ReturnType<typeof useMyOrganizationEmissionsBySiteLazyQuery>;
export type MyOrganizationEmissionsBySiteQueryResult = Apollo.QueryResult<MyOrganizationEmissionsBySiteQuery, MyOrganizationEmissionsBySiteQueryVariables>;