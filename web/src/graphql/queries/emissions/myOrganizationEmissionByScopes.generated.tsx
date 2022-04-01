import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyOrganizationEmissionsByScopeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyOrganizationEmissionsByScopeQuery = { __typename?: 'Query', myOrganizationEmissionsByScope: Array<{ __typename?: 'ScopeSummary', scope: string, values: string }> };


export const MyOrganizationEmissionsByScopeDocument = gql`
    query MyOrganizationEmissionsByScope {
  myOrganizationEmissionsByScope {
    scope
    values
  }
}
    `;

/**
 * __useMyOrganizationEmissionsByScopeQuery__
 *
 * To run a query within a React component, call `useMyOrganizationEmissionsByScopeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationEmissionsByScopeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationEmissionsByScopeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationEmissionsByScopeQuery(baseOptions?: Apollo.QueryHookOptions<MyOrganizationEmissionsByScopeQuery, MyOrganizationEmissionsByScopeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrganizationEmissionsByScopeQuery, MyOrganizationEmissionsByScopeQueryVariables>(MyOrganizationEmissionsByScopeDocument, options);
      }
export function useMyOrganizationEmissionsByScopeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrganizationEmissionsByScopeQuery, MyOrganizationEmissionsByScopeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrganizationEmissionsByScopeQuery, MyOrganizationEmissionsByScopeQueryVariables>(MyOrganizationEmissionsByScopeDocument, options);
        }
export type MyOrganizationEmissionsByScopeQueryHookResult = ReturnType<typeof useMyOrganizationEmissionsByScopeQuery>;
export type MyOrganizationEmissionsByScopeLazyQueryHookResult = ReturnType<typeof useMyOrganizationEmissionsByScopeLazyQuery>;
export type MyOrganizationEmissionsByScopeQueryResult = Apollo.QueryResult<MyOrganizationEmissionsByScopeQuery, MyOrganizationEmissionsByScopeQueryVariables>;