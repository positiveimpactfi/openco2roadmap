import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyOrganizationSiteTypesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyOrganizationSiteTypesQuery = { __typename?: 'Query', siteTypes: Array<{ __typename?: 'SiteType', id: string, name: string }> };


export const MyOrganizationSiteTypesDocument = gql`
    query MyOrganizationSiteTypes {
  siteTypes {
    id
    name
  }
}
    `;

/**
 * __useMyOrganizationSiteTypesQuery__
 *
 * To run a query within a React component, call `useMyOrganizationSiteTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationSiteTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationSiteTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationSiteTypesQuery(baseOptions?: Apollo.QueryHookOptions<MyOrganizationSiteTypesQuery, MyOrganizationSiteTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrganizationSiteTypesQuery, MyOrganizationSiteTypesQueryVariables>(MyOrganizationSiteTypesDocument, options);
      }
export function useMyOrganizationSiteTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrganizationSiteTypesQuery, MyOrganizationSiteTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrganizationSiteTypesQuery, MyOrganizationSiteTypesQueryVariables>(MyOrganizationSiteTypesDocument, options);
        }
export type MyOrganizationSiteTypesQueryHookResult = ReturnType<typeof useMyOrganizationSiteTypesQuery>;
export type MyOrganizationSiteTypesLazyQueryHookResult = ReturnType<typeof useMyOrganizationSiteTypesLazyQuery>;
export type MyOrganizationSiteTypesQueryResult = Apollo.QueryResult<MyOrganizationSiteTypesQuery, MyOrganizationSiteTypesQueryVariables>;