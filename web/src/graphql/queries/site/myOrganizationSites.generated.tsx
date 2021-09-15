import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyOrganizationSitesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyOrganizationSitesQuery = { __typename?: 'Query', allSitesInMyOrganization: Array<{ __typename?: 'Site', name: string, id: string, municipality?: Types.Maybe<{ __typename?: 'Municipality', name: string }>, siteType: { __typename?: 'SiteType', name: string }, siteUnits?: Types.Maybe<Array<{ __typename?: 'SiteUnit', id: string, name: string }>> }> };


export const MyOrganizationSitesDocument = gql`
    query MyOrganizationSites {
  allSitesInMyOrganization {
    name
    id
    municipality {
      name
    }
    siteType {
      name
    }
    siteUnits {
      id
      name
    }
  }
}
    `;

/**
 * __useMyOrganizationSitesQuery__
 *
 * To run a query within a React component, call `useMyOrganizationSitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationSitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationSitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationSitesQuery(baseOptions?: Apollo.QueryHookOptions<MyOrganizationSitesQuery, MyOrganizationSitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrganizationSitesQuery, MyOrganizationSitesQueryVariables>(MyOrganizationSitesDocument, options);
      }
export function useMyOrganizationSitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrganizationSitesQuery, MyOrganizationSitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrganizationSitesQuery, MyOrganizationSitesQueryVariables>(MyOrganizationSitesDocument, options);
        }
export type MyOrganizationSitesQueryHookResult = ReturnType<typeof useMyOrganizationSitesQuery>;
export type MyOrganizationSitesLazyQueryHookResult = ReturnType<typeof useMyOrganizationSitesLazyQuery>;
export type MyOrganizationSitesQueryResult = Apollo.QueryResult<MyOrganizationSitesQuery, MyOrganizationSitesQueryVariables>;